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


	/* The getters for the various class properties */
	get hand(): string[] { return this._hand; };
	get answers(): string[] { return this._answers; };
	get questions(): string[] { return this._questions; };


	/**
	 * Adds the question(s) to the medium's hand
	 *
	 * @param questions The array of question text to add the medium's hand.
	 */
	public addCardsToHand(questions: string[]): void {
		this._hand.push(...questions);
	};


	/**
	 * Resets all the per-game data related to this team
	 */
	public reset(): void {
		this._hand = [];
		this._questions = [];
		this._answers = new Array<string>(8).fill(``);
	}


	/**
	 * Removes the given question from the medium's hand
	 *
	 * @param question The card text to remove from the hand.
	 */
	public removeCard(question: string) {
		this._hand = this._hand.filter(x => x != question);
	};


	/**
	 * Adds the given question to the history of the questions.
	 *
	 * @param question The question the spirit is answering
	 */
	public selectQuestion(question: string) {
		this._questions.push(question);
	};


	/**
	 * Takes the value of an answer and modifies in the storage.
	 *
	 * @param answerIndex The value of the answer between 1 and 8 (inclusive)
	 * @param answer The new answer for that index
	 * @throws Error If the answerIndex is not in range
	 */
	public modifyAnswer(answerIndex: answer, answer: string) {
		if (answerIndex > this._answers.length || answerIndex <= 0) {
			throw new Error(`Cannot set answer at index ${answerIndex}.`)
		};
		this._answers[answerIndex - 1] = answer;
	};


	/**
	 * Converts the given object into a JSON representation of the data
	 */
	public toJSON(): datastoreTeam {
		return {
			questions: this._questions,
			answers: this._answers,
			hand: this._hand,
			id: this.id,
		};
	};

	/**
	 * Converts a team JSON object back into a Team object.
	 */
	public static fromJSON(data: datastoreTeam): Team {
		let t = new Team(data.id);
		t._questions = data.questions;
		t._answers = data.answers;
		t._hand = data.hand;
		return t;
	};
};