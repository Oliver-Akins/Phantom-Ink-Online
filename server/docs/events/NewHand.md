# `NewHand`:

## Description:
This is the event client sends it requests a new 7 cards for the hand.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| team     | Integer | The team that is requesting a new hand.

## Response Payload:
This event's response comes in the form of the `UpdateHand` event with the mode set to `"replace"`