# Properties Of All Response Payloads
| Property | Type | Description
| -------- | ---- | -----------
| status   | Integer | The response code of the server. This follows HTTP standards as described by [Mozilla's Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
| message? | String | More information relating to the response. This is set iff `success` is a non 2XX value.

<br><br>
---

# `CreateGame`:

## Event Description:
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

<br><br>
---

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

<br><br>
---

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

<br><br>
---

# `PlayerUpdate`:

## Description:
This event is sent from the server and is a result of a player joining/changing team.

## Request Payload:
The client cannot send this event and only receives it.

## Response Payload:
| Property | Type | Description
| -------- | ---- | -----------
| player   | Player | The player's new data.

<br><br>
---

# ``:

## Description:


## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------


## Response Payload: (``)
| Property | Type | Description
| -------- | ---- | -----------


<br><br>
---

# ``:

## Description:


## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------


## Response Payload: (``)
| Property | Type | Description
| -------- | ---- | -----------


<br><br>
---