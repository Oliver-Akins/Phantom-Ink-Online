# `UpdatePlayer`:

## Description:
This event is sent as a result of a player joining/changing team, this event is also fired when a new player joins the game. The client sends the event to update what team/role they are on.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The player's name
| team     | Integer | The team to join. Accepted values are: `1`, and `2`, any other value will throw an error.
| role     | String | The role the player is assuming. This can be `"writer"` or `"guesser"`, any other value will throw an error.

## Response Payload:
| Property | Type | Description
| -------- | ---- | -----------
| player   | Player | The player's new data.