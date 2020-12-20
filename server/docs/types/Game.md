## Game:
This is a representation of the game and it's corresponding data.

| Property | Type | Description
| -------- | ---- | -----------
| id       | String | The game's ID to join with.
| teams    | Team[] | The teams that are a part of this game.
| players  | Player[] | All of the players that are in this game.
| questons | Deck | The deck and discard of the question cards.
| objects  | Deck | The deck and discard of the object cards.
| getObjects | String[] | Gets the objects that the game has chosen.