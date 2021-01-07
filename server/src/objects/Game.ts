import { Team } from "./Team";
import { Deck } from "./Deck";
import { readFile } from "fs";
import neatCSV from "neat-csv";
import { Logger } from "tslog";
import { Player } from "./Player";
import { games, hibernatedGames } from "../main";

export class Game {
	readonly id: string;
	readonly host: Player;
	public log: Logger;
	public ingame: boolean;
	public teams: [Team, Team];
	public players: Player[];
	private _questions: Deck<question_deck>;
	private _objects: Deck<object_deck>;
	private _objectCard: string[];
	public object: string;


	constructor(conf: config, host: Player) {
		this.id = Game.generateID(conf.game.code_length);
		this.host = host;
		this.ingame = false;
		this.players = [];

		// Get the decks based on what type of data they are.
		switch (conf.game.cards.type) {
			case "csv":
				this.parseDeckCSV(conf);
				break;
			case "sheets":
				this.parseDeckGoogleSheets(conf);
				break;
		};
		// Instantiate everything for the teams
		this.teams = [ new Team(1), new Team(2) ];
	};

	get questions() { return this._questions; };

	get objects() {
		/**
		 * Return the objects that the spirits can choose from for the game.
		 */
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


	private parseDeckCSV(conf: config): any {
		/**
		 * Parses out the CSV files and creates the decks for the game to run on
		 *
		 * @param path -> The filepath of the CSV file
		 */

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

	private parseDeckGoogleSheets(conf: config): void {
		/**
		 * Fetches and parses the CSV data from Google Sheets instead of local
		 * CSV files.
		 *
		 * @param conf -> The config object
		 */
	};


	public toJSON(): datastoreGame {
		/**
		 * Returns a JSON representation of the game.
		 */
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

	public static fromJSON() {
		/**
		 * Converts a JSON object into a Game object
		 */
	};


	public static generateID(length: number): string {
		/**
		 * Generates a game code with the given length
		 *
		 * @param length -> The length of the code we want to generate
		 */
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