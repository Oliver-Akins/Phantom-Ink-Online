## Player:
| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The player's name.
| role     | String | The player's role. This will be one of `"guesser"` or `"writer"`.
| team     | Integer | The player's team. This will be one of `1` or `2`

## Game:
| Property | Type | Description
| -------- | ---- | -----------
| game_code | String | The game's unique identifier used for joining the game.
| players | Player[] | The players that are currently in the game.
| state | String | What state the game is currently in. This can be one of `"lobby"`, or `"playing"`