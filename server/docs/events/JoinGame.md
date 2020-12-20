# `JoinGame`:

## Description:
Triggered by the client when it attempts to connect to a game.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The user's name
| game_code | String | The game code for the game the user is trying to join.
| id?      | String | The user's ID that was stored if they have already joined a game and not finished it.

## Response Payload: (`GameJoined`)
| Property | Type | Description
| -------- | ---- | -----------
| id       | String | The user's game ID, if `id` is set in the payload, this is the same, otherwise it is a brand new ID.