import axios from "axios";
import { Team } from "./Team";
import { Deck } from "./Deck";
import { readFile } from "fs";
import neatCSV from "neat-csv";
import { Logger } from "tslog";
import { Player } from "./Player";
import { games, hibernatedGames, conf, log } from "../main";

export class Game {
	readonly id: string;
	readonly host: Player;
	public log: Logger;
	public ingame: boolean;
	public teams: Team[];
	public players: Player[];
	private _questions: Deck<question_deck>;
	private _objects: Deck<object_deck>;
	private _objectCard: string[]|null;
	public object: string;


	constructor(host: Player, options:any=null) {
		this.host = host;
		this.ingame = false;
		this.players = [host];
		this.id = options?.id || Game.generateID(conf.game.code_length);

		// If the object is being instantiated from JSON we don't want to do
		// any of the stuff that requires weird per-game stuff
		if (!options) {

			// Get the decks based on what type of data they are.
			switch (conf.game.cards.type) {
				case "csv":
					this.parseDeckCSV();
					break;
				case "sheets":
					this.parseDeckGoogleSheets();
					break;
			};
			// Instantiate everything for the teams
			this.teams = [ new Team(1), new Team(2) ];
		};
	};

	get questions() { return this._questions; };

	/**
	 * Return the objects that the spirits can choose from for the game.
	 */
	get objects() {
		if (!this._objectCard) {
			this._objectCard = this._objects.draw(1)[0];
		};
		return this._objectCard;
	};

	get playerData() {
		let players: player[] = [];
		for (var player of this.players) {
			players.push({
				name: player.name,
				role: player.role,
				team: player.team,
			});
		};
		return players
	}


	/**
	 * Parses out the CSV files and creates the decks for the game to run
	 * on.
	 */
	private parseDeckCSV() {

		// parse the questions from the CSV
		readFile(conf.game.cards.questions.fingerprint, `utf-8`, (err, filebuffer) => {
			if (err) throw err;
			neatCSV(filebuffer)
			.then((data) => {
				let questions: question_deck[] = [];
				for (var entry of data) {
					questions.push(Object.values(entry)[conf.game.cards.questions.column]);
				};
				this._questions = new Deck(questions);
			});
		});

		// Parse the object deck from CSV
		readFile(conf.game.cards.objects.fingerprint, `utf-8`, (err, filebuffer) => {
			if (err) throw err;
			neatCSV(filebuffer)
			.then((data) => {
				let objects: object_deck[] = [];
				for (var line of data) {
					objects.push(Object.values(line));
				};
				this._objects = new Deck(objects);
			})
		});
	};

	/**
	 * Fetches and parses the CSV data from Google Sheets instead of local
	 * CSV files.
	 */
	private parseDeckGoogleSheets() {
		let key = conf.game.cards.key as string;
		let questions_id = conf.game.cards.questions.fingerprint;
		let objects_id = conf.game.cards.objects.fingerprint;

		// Get the questions deck
		axios.get(`https://docs.google.com/spreadsheets/d/e/${key}/pub?gid=${questions_id}&single=true&output=csv`)
		.then(response => {
			// Ensure not errored
			if (response.status !== 200) {
				log.warn(`Error Downloading CSV: ${response.statusText}`);
				return;
			};

			// Parse the loaded CSV
			neatCSV(response.data)
			.then((data) => {
				let questions: question_deck[] = [];
				for (var entry of data) {
					questions.push(Object.values(entry)[conf.game.cards.questions.column]);
				};
				this._questions = new Deck(questions);
			});
		})
		.catch(err => {
			log.prettyError(err);
		});


		// Get the objects deck
		axios.get(`https://docs.google.com/spreadsheets/d/e/${key}/pub?gid=${objects_id}&single=true&output=csv`)
		.then(response => {
			// Ensure not errored
			if (response.status !== 200) {
				log.warn(`Error Downloading CSV: ${response.statusText}`);
				return;
			};

			// Parse the downloaded CSV
			neatCSV(response.data)
			.then((data) => {
				let objects: object_deck[] = [];
				for (var line of data) {
					objects.push(Object.values(line));
				};
				this._objects = new Deck(objects);
			});
		})
		.catch(err => {
			log.prettyError(err);
		});
	};


	/**
	 * Resets the objects card, for restarting the game
	 */
	public resetObject() {
		if (this._objectCard) {
			this._objects.discard(this._objectCard);
			this._objectCard = null;
			this.object = ``;
		};
	};


	/**
	 * Returns a JSON representation of the game.
	 */
	public toJSON(): datastoreGame {
		return {
			players: this.players.map(p => p.toJSON()),
			teams: this.teams.map(t => t.toJSON()),
			decks: {
				questions: this._questions.toJSON(),
				objects: this._objects.toJSON(),
			},
			objectCard: this._objectCard,
			object: this.object,
			ingame: this.ingame,
			id: this.id,
		};
	};

	/**
	 * Converts a JSON representation into a Game object
	 */
	public static fromJSON(host: Player, data: datastoreGame): Game {
		let game = new this(host, { id: data.id });

		// Re-create the deck objects
		game._questions = Deck.fromJSON<question_deck>(data.decks.questions);
		game._objects = Deck.fromJSON<object_deck>(data.decks.objects);

		game.teams = data.teams.map(t => Team.fromJSON(t));

		// Re-instantiate all the players from the game.
		for (var player of data.players) {
			if (player.name !== host.name) {
				player.host = false;
				game.players.push(Player.fromJSON(player));
			};
		};

		game._objectCard = data.objectCard;
		game.object = data.object;

		return game;
	};


	/**
	 * Generates a game code with the given length
	 *
	 * @param length The length of the code we want to generate
	 */
	public static generateID(length: number): string {
		let code: string;

		// Generate a code until we don't have a collision
		do {
			code = ``;
			for (var i = 0; i < length; i++) {
				code += `${Math.floor(Math.random() * 9)}`;
			};
		} while (games[code] || hibernatedGames.includes(code));

		return code;
	};
};