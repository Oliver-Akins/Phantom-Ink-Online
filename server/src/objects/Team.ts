import { Player } from "./Player";

export class Team {
	readonly id: team;
	public guessers: Player[];
	public writer: Player | null;
	private _hand: string[];
	private _questions: string[];
	private _answers: string[];

	constructor(id: team) {
		this.id = id;
		this._answers = new Array<string>(8).fill(``);
		this._questions = [];
		this._hand = [];
		this.guessers = [];
	};


	/*
	 * The getters for the various class properties
	 */
	get hand(): string[] { return this._hand; };
	get answers(): string[] { return this._answers; };
	get questions(): string[] { return this._questions; };


	public addCardsToHand(questions: string[]): void {
		/**
		 * Adds the question(s) to the medium's hand
		 *
		 * @param questions -> The array of question text to add the medium's
		 * 		hand.
		 */
		this._hand.push(...questions);
	};


	public removeCard(question: string) {
		/**
		 * Removes the given question from the medium's hand
		 *
		 * @param question -> The card text to remove from the hand.
		 */
		this._hand = this._hand.filter(x => x != question);
	};


	public selectQuestion(question: string) {
		/**
		 * Adds the given question to the history of the questions.
		 *
		 * @param question -> The question the spirit is answering
		 */
		this._questions.push(question);
	};


	public modifyAnswer(answerIndex: answer, answer: string) {
		/**
		 * Takes the value of an answer and modifies in the storage.
		 *
		 * @param answerIndex -> The value of the answer between 1 and 8 (inclusive)
		 * @param answer -> The new answer for that index
		 * @throws Error -> If the answerIndex is not in range
		 */
		if (answerIndex > this._answers.length || answerIndex <= 0) {
			throw new Error(`Cannot set answer at index ${answerIndex}.`)
		};
		this._answers[answerIndex - 1] = answer;
	};


	public toJSON(): datastoreTeam {
		/**
		 * Converts the given object into a JSON representation of the data
		 */
		return {
			questions: this._questions,
			answers: this._answers,
			hand: this._hand,
			id: this.id,
		};
	};

	public static fromJSON(data: datastoreTeam): Team {
		/**
		 * Converts a team JSON object back into a Team object.
		 */
		let t = new Team(data.id);
		t._questions = data.questions;
		t._answers = data.answers;
		t._hand = data.hand;
		return t;
	};
};