import csv from "csv-parser";
import { Team } from "./Team";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { games, log } from "../main";
import { createReadStream } from "fs";

export class Game {
	readonly id: string;
	public teams: [Team, Team];
	public players: Player[];
	private _questions: Deck<question_deck>;
	private _objects: Deck<object_deck>;
	private _objectCard: string[];
	public object: string;


	constructor(conf: config) {
		this.id = Game.generateID(conf.game.code_length);

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
		this.teams = [ new Team(), new Team() ];
		this.teams[0].addQuestions(this._questions.draw(conf.game.hand_size));
		this.teams[1].addQuestions(this._questions.draw(conf.game.hand_size));
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


	private parseDeckCSV(conf: config): void {
		/**
		 * Parses out the CSV files and creates the decks for the game to run on
		 *
		 * @param conf -> The config object
		 */
		let questions: question_deck[] = [];
		let objects: object_deck[] = [];

		// parse the questions from the CSV and adding them to the array
		createReadStream(conf.game.cards.questions)
			.pipe(csv([`q`]))
			.on(`data`, (data) => { questions.push(data.q)})
			.on(`end`, () => {
				log.debug(`Loaded questions cards from CSV file: ${conf.game.cards.questions}`);
			});
		this._questions = new Deck(questions);

		// parse the objects from the CSV and add them to the array
		createReadStream(conf.game.cards.questions)
			.pipe(csv([`q`]))
			.on(`data`, (data) => { objects.push(Object.values(data))})
			.on(`end`, () => {
				log.debug(`Loaded object cards from CSV file: ${conf.game.cards.questions}`);
			});
		this._objects = new Deck(objects);
	};

	private parseDeckGoogleSheets(conf: config): void {
		/**
		 * Fetches and parses the CSV data from Google Sheets instead of local
		 * CSV files.
		 *
		 * @param conf -> The config object
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
		} while (games[code]);

		return code;
	};
};