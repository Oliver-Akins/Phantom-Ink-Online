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
bypass it by changing the URI in the `serc/main.js` file to have a specific URL and port.

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