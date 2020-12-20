# `UpdateHand`:

## Description:
Tells the client to update their hand, using one of the provided modes.

## Request Payload:
This event is never sent to the server

## Response Payload:
| Property | Type | Description
| -------- | ---- | -----------
| questions | String[] | The cards that the operation for the hand will use.
| mode     | String | This is one of `"append"` or `"replace"`