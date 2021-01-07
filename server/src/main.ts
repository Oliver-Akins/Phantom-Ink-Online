import * as toml from "toml";
import { Logger } from "tslog";
import { Game } from "./objects/Game";
import startWebsocket from "./websocket";
import { Validate } from "./utils/validate";
import { processExit } from "./utils/cleanup";
import { readdirSync, readFileSync } from "fs";

export const conf: config = toml.parse(readFileSync(`server.toml`, `utf-8`));

/*
 * These are the objects that we use to keep track of the different games,
 * there are two different types of game, hibernated, and active. Hibernated
 * games are games which have data associated with them in the datastore, but
 * have not had any requests associated with them since they were hibernated.
 * Active games are games that have active socket connections associated with
 * them or have not been cleaned up by the game creation process yet. Active
 * games become hibernated once the server has been closed while they are in
 * the middle of a game, if they are in the lobby, the cleanup systems will
 * just delete the game outright instead of saving it to disk. These methods
 * allow us to keep games that are in the process of being played if/when the
 * server crashes/restarts from having to completely start the game over again.
 */
export var hibernatedGames: string[] = [];
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
		log.info(`Loading list of hibernated games`);

		// Get game IDs from datastore
		hibernatedGames = readdirSync(conf.datastores.directory)
			.filter(g => g.endsWith(conf.datastores.filetype))
			.map(f => f.replace(`\.${conf.datastores.filetype}`, ``));

		process.on(`uncaughtException`, processExit);
		process.on(`SIGINT`, processExit);
	};

	startWebsocket(conf);
}