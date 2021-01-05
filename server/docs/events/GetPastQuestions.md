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