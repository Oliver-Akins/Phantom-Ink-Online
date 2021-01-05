import * as toml from "toml";
import { Logger } from "tslog";
import { readFileSync } from "fs";
import { Game } from "./objects/Game";
import startWebsocket from "./websocket";
import { Validate } from "./utils/validate";
import { processExit } from "./utils/cleanup";

export const conf: config = toml.parse(readFileSync(`server.toml`, `utf-8`));

export var games: {[index: string]: Game} = {};

export const log: Logger = new Logger({
	displayFunctionName: false,
	displayLoggerName: true,
	displayFilePath: `hidden`,
	displayLogLevel: true,
	minLevel: conf.log.level,
	name: `GLOBAL`,
});

// Ensure the config valid
if (Validate.config(conf)) {

	// Add event listeners if we want to use the datastore saving game system
	if (conf.datastores.enabled) {

		// Get games from datastore

		process.on(`uncaughtException`, processExit);
		process.on(`SIGINT`, processExit);
	};

	startWebsocket(conf);
}