# `CreateGame`:

## Description:
Triggered when a user is creating a game.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The name of the person starting the game

## Response Payload: (`GameCreated`)
| Property | Type | Description
| -------- | ---- | -----------
| id       | String | The user's game ID, this should be stored to permit users to re-join the game if they get disconnected.
| game_code | String | The game's code that other players can use to connect to the game.