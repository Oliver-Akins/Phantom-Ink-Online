# Setup:
1. `cd` into this `server` directory.
2. Run `pnpm install` to install all of the required dependencies.
3. Create a copy of the `template.toml` file, and name it `server.toml`.
4. Edit the `server.toml` file to adjust the
5. Run `tsc` to compile the TypeScript into Javascript. This should create a
`dist` directory.


## Using systemd to manage the server: (Not currently implemented)
This app comes with a `ghost-writer.service` file which is already set up to
manage the server, it just requires a little bit of additional setup. If you
change any of the symlinking in the steps below, it is your responsibility to
figure it out, I will not guarantee support for people who attempt to modify
the service file.

6. Create a symlink named `server` in the server root (`/`) pointing to the
server folder in the Ghost Writer git repository.
(Ex: `sudo ln -s ~/Ghost-Writer-Online/server /server`)
7. Create a symlink named `ghost-writer.service` in `/`
pointing to the service file in the `server` folder of the Ghost Writer Online
repository. (Ex: `sudo ln -s /etc/systemd/system/ghost-writer.service /server/ghost-writer.service`)
8. Start the websocket server with `sudo systemctl start ghost-writer`.
9. Make sure the server is started by running `systemctl status ghost-writer`

* To restart the server, run `sudo systemctl restart ghost-writer`.
* To stop the server, run `sudo systemctl stop ghost-writer`.
* To access the server logs, run `journalctl`


## Using a detached terminal:
If you would prefer that the server does not automatically restart and you can
more easily output log output to a file, you can run the server by following
the below steps:

6. Make sure you know how to invoke a single command with your preferred method
of detaching terminals.
7. Have the detached terminal's working directory be in the `server` folder of
this repository.
8. Run `node dist/main.js` for logging directly to the CLI, or
`node dist/main.js > output.log` for logging to a file named `output.log`.
9. Detach your terminal.


---

# Configuration:
All of the configuration for the server is done in the `server.toml` with
explanations in the file. When a value is changed in the config, you will need
to restart the server. This is either through systemd
(`sudo systemctl restart ghost-writer`) or through your preferred terminal
detacher, by stopping then re-starting the process.