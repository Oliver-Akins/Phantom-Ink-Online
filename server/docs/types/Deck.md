## Deck<T>
This represents a stack of cards that can be drawn from and discarded to.

| Property | Type | Description
| -------- | ---- | -----------
| _discard | T[]  | The used cards from the deck.
| _unknown | T[]  | The cards that are neither in the deck or the discard.
| (get) size | Integer | The number of the cards that are left in the deck.