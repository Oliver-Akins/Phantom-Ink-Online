# Properties Of All Response Payloads
| Property | Type | Description
| -------- | ---- | -----------
| status   | Integer | The response code of the server. This follows HTTP standards as described by [Mozilla's Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
| message? | String | More information relating to the response. This is set iff `success` is a non 2XX value.
| source?  | String | The event name that caused this response to be sent. This is set iff is a non 2XX value.