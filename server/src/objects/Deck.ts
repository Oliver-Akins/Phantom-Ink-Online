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


	public draw(quantity: number): T[] {
		/**
		 * Draws X cards from the deck
		 *
		 * @param quantity -> The number of cards to draw
		 * @throws Error -> If quantity is <= 0
		 * @throws Error -> If quantity > size
		 */
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


	public discard(card: T) {
		/**
		 * Adds the specific card to the discard pile
		 *
		 * @param card -> The card to add to the discard pile
		 */
		this._unknown = this._unknown.filter(x => x != card);
		this._discard.push(card);
	};
};