## Game:
This is a representation of the game and it's corresponding data.

| Property | Type | Description
| -------- | ---- | -----------
| id       | String | The game's ID to join with.
| host     | Player | The player who created the game.
| ingame   | Boolean | Whether or not this game is being played or is in the lobby.
| teams    | Team[] | The teams that are a part of this game.
| players  | Player[] | All of the players that are in this game.
| _questons | Deck | The deck and discard of the question cards.
| _objects  | Deck | The deck and discard of the object cards.
| _objectCard | String[] | The card that was drawn from the deck for the spirits to choose an object from.
| object   | String | The chosen object that the spirits decided on.
| (get) questions | Deck | Returns the deck from the private attribute.
| (get) objects | String[] | Returns the objects from the card that was drawn for the game.