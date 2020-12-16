# Properties Of All Response Payloads
| Property | Type | Description
| -------- | ---- | -----------
| status   | Integer | The response code of the server. This follows HTTP standards as described by [Mozilla's Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
| message? | String | More information relating to the response. This is set iff `success` is a non 2XX value.
| source?  | String | The event name that caused this response to be sent. This is set iff is a non 2XX value.

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

# `UpdateAnswer`:

## Description:
This event is sent to and from the server when a spirit is typing into one of the text boxes.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| team     | Integer | The team indicator number. This can be either `1`, or `2`, any other value will cause this event to return an error.
| answer   | Integer | The answer that is being updated. This can be any number between `1` and `8` (inclusive), any other value will cause this event return an error.
| value    | String | The new text for the input box.

## Response Payload: (`UpdateAnswer`)
| Property | Type | Description
| -------- | ---- | -----------
| team     | Integer | The team indicator number. This can be either `1`, or `2`.
| answer   | Integer | The answer that is being updated. This can be any number between `1` and `8` (inclusive).
| value    | String | The new text for the input box.


<br><br>
---

# `SendCard`:

## Description:
Sends a card to the server, the server either then either forwards the card to the spirit or the past questions pile. The action that is taken is dependant on what the `from` property is set to.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| text     | String | The text of the card that is being sent.
| from     | String | The source of where the card is being sent from. This can be one of `"writer"`, `"guesser"`, any other value will return an error.
| team     | Integer | The team that is sending the card. This can be either `1` or `2`, any other value will return an error.

## Response Payload: (`NewCard`)
| Property | Type | Description
| -------- | ---- | -----------
| text     | String | The text of the card that was sent.
| from     | String | The source of the card. This will be one of `"deck"`, or `"guesser"`

<br><br>
---

# `GetPastQuestions`:

## Description:
This event is sent from the client to the server when it has the PastQuestions component visible.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| team     | Integer | The team we are requesting the questions for. This can be one of `1`, or `2`, any other value will cause an error to be returned.

## Response Payload: (`PastQuestions`)
| Property | Type | Description
| -------- | ---- | -----------
| questions | String[] | All the previously chosen questions for the team.

<br><br>
---


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