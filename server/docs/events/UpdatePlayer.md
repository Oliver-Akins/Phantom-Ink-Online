# `UpdatePlayer`:

## Description:
This event is sent from the server and is a result of a player joining/changing team, this event is also fired when a new player joins the game.

## Request Payload:
The client cannot send this event and only receives it.

## Response Payload:
| Property | Type | Description
| -------- | ---- | -----------
| player   | Player | The player's new data.