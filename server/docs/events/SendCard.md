# `SendCard`:

## Description:
Sends a card to the server, the server either then either forwards the card to the spirit or the past questions pile. The action that is taken is dependant on what the `from` property is set to.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| game_code | String | The game code for the player.
| text     | String | The text of the card that is being sent.
| from     | String | The source of where the card is being sent from. This can be one of `"writer"`, `"guesser"`, any other value will return an error.
| team     | Integer | The team that is sending the card. This can be either `1` or `2`, any other value will return an error.

## Response Payload: (`NewCards`)
The response to this event comes in the form of an `UpdateHand` event with the `mode` set to `"append"`.