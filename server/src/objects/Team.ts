import { Player } from "./Player";

export class Team {
	readonly id: team;
	public guessers: Player[];
	public writer: Player | null;
	private _hand: team_hands;
	private _questions: string[];
	private _answers: string[];

	constructor(id: team) {
		this.id = id;
		this._answers = new Array<string>(8).fill(``);
		this._questions = [];
		this._hand = {
			guesser: [],
			writer: []
		};
		this.guessers = [];
	};


	/* The getters for the various class properties */
	get hand(): string[] { return this._hand.guesser; };
	get spiritHand(): string[] { return this._hand.writer };
	get answers(): string[] { return this._answers; };
	get questions(): string[] { return this._questions; };


	/**
	 * Adds the question(s) to the medium's hand
	 *
	 * @param questions The array of question text to add the medium's hand.
	 */
	public addCardsToHand(questions: string[]): void {
		this._hand.guesser.push(...questions);
	};


	/**
	 * Removes all players from the team.
	 */
	public removePlayers() {

		// Reset the writer
		if (this.writer) {
			this.writer.team = null;
			this.writer.role = null;
			this.writer = null;
		};

		// Reset all the guessers
		for (var player of this.guessers) {
			player.team = null;
			player.role = null;
		}
		this.guessers = [];
	};


	/**
	 * Resets all the per-game data related to this team
	 */
	public reset(): void {
		this._hand.guesser = [];
		this._questions = [];
		this._answers = new Array<string>(8).fill(``);
	};


	/**
	 * Removes a card from the medium's hand
	 *
	 * @param question The card to remove
	 */
	public removeCard(question: string) {
		this._hand.guesser = this._hand.guesser.filter(x => x != question);
	};


	/**
	 * Asks the spirit a question, removing it from the medium's hands
	 *
	 * @param question The question that is being asked
	 */
	public askSpirit(question: string) {
		this._hand.writer.push(question);
		this.removeCard(question);
	};


	/**
	 * Adds the given question to the history of the questions.
	 *
	 * @param question The question the spirit is answering
	 */
	public selectQuestion(question: string) {
		this._questions.push(question);
		this._hand.writer = [];
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
			hands: this._hand,
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
		t._hand = data.hands;
		return t;
	};
};