import { Player } from "./Player";

export class Team {
	public guessers: Player[];
	public writer: Player | null;
	private _hand: string[];
	private _questions: string[];
	private _answers: string[];

	constructor() {
		this._answers = new Array<string>(8).fill(``);
		this._questions = [];
		this._hand = [];
	};


	/*
	 * The getters for the various class properties
	 */
	get hand(): string[] { return this._hand; };
	get answers(): string[] { return this._answers; };
	get questions(): string[] { return this._questions; };


	public addQuestions(questions: string[]): void {
		/**
		 * Adds the question(s) to the medium's hand
		 *
		 * @param questions -> The array of question text to add the medium's
		 * 		hand.
		 */
		this._questions.push(...questions);
	};


	public removeCard(question: string) {
		/**
		 * Removes the given question from the medium's hand
		 *
		 * @param question -> The card text to remove from the hand.
		 */
		this._hand = this._hand.filter(x => x != question);
	};


	public modifyAnswer(answerIndex: number, answer: string) {
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
};