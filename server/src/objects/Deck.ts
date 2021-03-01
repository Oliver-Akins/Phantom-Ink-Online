export class Deck<T> {
	private _discard: T[];
	private _unknown: T[];
	private _deck: T[];


	constructor(cards: T[]) {
		this._deck = cards;
		this._discard = [];
		this._unknown = [];
	};


	get size(): number { return this._deck.length; }


	/**
	 * Draws X cards from the deck
	 *
	 * @param quantity The number of cards to draw
	 * @throws Error If quantity is <= 0
	 * @throws Error If quantity > size
	 */
	public draw(quantity: number): T[] {
		if (quantity <= 0) {
			throw new Error(`Cannot get ${quantity} cards.`);
		} else if (quantity > this.size) {
			throw new Error(`Cannot draw more cards than there are in the deck.`);
		};

		let cards: T[] = [];

		// Draw the cards for the player and move them into the unknown group
		for (var i = 0; i < quantity; i++) {

			// Determine the card for the player(s)
			let index = Math.floor(Math.random() * this.size);
			let card = this._deck[index];

			// Move it from the arrays
			cards.push(card);
			this._deck.splice(index, 1);
			this._unknown.push(card);
		};

		return cards;
	};


	/**
	 * Adds the specific card to the discard pile
	 *
	 * @param card The card to add to the discard pile
	 */
	public discard(card: T) {
		this._unknown = this._unknown.filter(x => x != card);
		this._discard.push(card);
	};


	public reset() {
		this._deck.push(...this._discard, ...this._unknown);
		this._discard = [];
		this._unknown = [];
	};


	/**
	 * Converts this Deck into a JSON-compatible object
	 */
	public toJSON(): datastoreDeck<T> {
		return {
			deck: this._deck,
			unknown: this._unknown,
			discard: this._discard,
		};
	};

	/**
	 * Converts the JSON representation of a deck into a Deck
	 */
	public static fromJSON<A>(data: datastoreDeck<A>): Deck<A> {
		let d = new Deck(data.deck);
		d._discard = data.discard;
		d._unknown = data.unknown;
		return d;
	};
};