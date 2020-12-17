## Player:
| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The player's name.
| id       | String | The player's unique ID.

## Game:
| Property | Type | Description
| -------- | ---- | -----------
| id       | String | The game's ID to join with.
| teams    | Team[] | The teams that are a part of this game.
| players  | Player[] | All of the players that are in this game.
| q_deck   | String[] | The deck of question cards that the mediums can ask the spirit.
| o_deck   | String[] | The deck of object cards that the spririts can pick from when the game starts.

## Team
| Property | Type | Description
| -------- | ---- | -----------
| players  | Player[] | All the Players that are on this team.
| spirit   | Player | The player that is acting as the team's spirit.
| hand     | String[] | The cards that are in this team's hand.
| questions | String[] | The questions that the mediums have asked the spirit.
| answers | String[] | The answers that the spirit has given.