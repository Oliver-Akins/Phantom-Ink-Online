## Team
A representation of a team, this consists of which player is the spirit and a complete list of all the players on the team,

| Property | Type | Description
| -------- | ---- | -----------
| guessers | Player[] | All the Players that are on this team.
| writer   | Player | The player that is acting as the team's spirit.
| _hand    | String[] | The cards that are in the medium's hand.
| _questions | String[] | The questions that the mediums have asked the spirit. (This is not equivalent to the Spirit's hand)
| _answers  | String[] | The answers that the spirit has given.
| (get) hand | String[] | Returns the medium's hand.
| (get) answers | String[] | Returns the team's answers.
| (get) questions | String[] | Returns the team's questions.