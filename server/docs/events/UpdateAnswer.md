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