# `JoinTeam`:

## Description:
This event is triggered by the client when the user attempts to join a team from the lobby.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| team     | int  | The team to join. Accepted values are: `1`, and `2`, any other value will throw an error.
| role     | String | The role the player is assuming. This can be `"writer"` or `"guesser"`, any other value will throw an error.

## Response Payload: (`JoinTeam`)
| Property | Type | Description
| -------- | ---- | -----------