## Player:
A player's information for the game.

| Property | Type | Description
| -------- | ---- | -----------
| name     | String | The player's name.
| socket   | Socket | The socket object used to send events directly to the player.
| isHost   | Boolean | Whether or not the player is the host of the game.
| connected | Boolean | Whether or not the socket is connected.