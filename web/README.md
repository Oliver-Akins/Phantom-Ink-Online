# Setup:
1. `cd` into this `web` directory.
2. Run `pnpm install` to install all of the required dependencies for the site.

Now jump to the [Production](#Production) or [Development](#Development)
section and continue the steps there.

---

## Production
3. Run `pnpm build` to create the folder with all the files for the webserver.
4. Create a symlink pointing to the `dist/` directory that was created in the
last step.
5. Tell your favourite web server (I'd recommend nginx) for serving the files
from that directory.
6. In the webserver of your choice, you must also setup an
`example.com/socket.io` route that reverse proxies the websocket connection
through to the Node.js server. If you do not want to set up this proxy, you can
bypass it by changing the URI in the `src/main.js` file to have a specific URL and port.

Example: Change
```js
// This is the default value that will require a
// "/socket.io" proxy in your web server.
let websocket_uri = `/`;
```
to:
```js
// this is the specific domain and port to connect to, as an example on how to
// bypass setting up a reverse proxy.
let websocket_uri = `http://example.com:1234`;
```
7. Once the reverse proxy or specific URI is setup, connect to your website through the appropriate domain and check to see if it worked.


## Development:
3. Make sure the websocket server is started either through a terminal or
through the systemd service on port `8081` for local development. (if you want
to connect to a websocket server that is not on port 8081 for development, you
will need to change the port value in `src/main.js` to the correct port number)
4. Run `pnpm serve`, this will start a local hot-reloading server on
`localhost:8080`. **DO NOT** reverse-proxy this server. It serves files that
are not optimized nor minified.
5. Go to `localhost:8080` in your web browser of choice.


---

# Configuration:
Configuring the site is pretty simple, the most complicated part is already
done because you have a functional web server.

In order to edit any of the following settings, go to `src/store/index.js` and
find the respective value in the section that allows editing. **Important**:
Any values edited in this file will require re-building the site using
`pnpm build`, and the changes will only take place after players refresh their
web browser.

| Variable | Type | Description
| -------- | ---- | -----------
| survey_link | string | This is the link to the survey that will appear in the player's hand once the object has been correctly guessed and in the attributions modal. This can be left empty or `null` without any problems, the buttons will be hidden.
| name* | string | The name of the team.
| icon* | string | The filename of the icon used for the team reminder for the team. This assumes the file is in the `public/assets/` directory.
| eyes* | other | This is an object of numbers used to indicate how many eyes appear on that slot of the game board for the team.
| writer_name | string | How the interface should refer to the players who are receiving cards and writing.
| writer_card_button | string | The text that appears on the cards that are given to the writer by the guessers.
| writer_object_choose_button | string | The text that appears on the object choices for the writers to select one for them to use before being allowed to start giving clues to the guessers.
| guesser_name | string | How the interface should refer to the players who are sending the cards and guessing what the object is.
| guesser_card_button | string | The text that appears on the button for the cards in the guesser's hand in order to give the card to the writer.
| eye_icon | string | The filename of the eye icon. This assumes the file is in the `public/assets/` directory.
| discard_hand_icon | string | The filename of the icon used on the guesser's discard hand button. This assumes the file is in the `public/assets/` directory.

\* _Note_: These exist for teams 1 and 2, they can each have their own values (and it is recommended that they don't have the same values).