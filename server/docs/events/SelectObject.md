# `SelectObject`:

## Description:
The event sent by the clients when they are selecting an object from the card.

## Request Payload:
| Property | Type | Description
| -------- | ---- | -----------
| object   | String | The name of the object that the spirits are selecting.

## Response Payload: (`ChosenObject`)
| Property | Type | Description
| -------- | ---- | -----------
| object   | String | The object that has been selected.