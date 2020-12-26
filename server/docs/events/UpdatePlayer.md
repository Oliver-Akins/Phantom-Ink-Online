# `UpdatePlayer`:

## Description:
This event is sent as a result of a player joining/changing team, this event is also fired when a new player joins the game. The client sends the event to update what team/role they are on.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| action   | String | The action to take on the player. This can be one of `"modify"`, or `"remove"`, any other value will throw an error.
| name     | String | The player's name
| to       | PlayerData | The player's new data.
| from     | PlayerData | The player's old data.


### `PlayerData`:
The below table describes the properties for the player data object.
| Property | Type | Description
| -------- | ---- | -----------
| team     | Integer | The team to join. Accepted values are: `1`, and `2`, any other value will throw an error.
| role     | String | The role the player is assuming. This can be `"writer"` or `"guesser"`, any other value will throw an error.

## Response Payload:
| Property | Type | Description
| -------- | ---- | -----------
| action   | String | The action that we are responding, this can be one of `"new"`, `"modify"`, or `"remove"`.
| name     | String | The name of the player that is being updated.
| role     | String | The role the user is becoming. This can be `"writer"`, or `"guesser"`, and will only be set if the `action` is set to `modify`.
| team     | String | The team that the user is joining. This can be `1`, or `2`, and will only be set if the `action` is set to `modify`.