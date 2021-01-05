import * as toml from "toml";
import { Logger } from "tslog";
import { readFileSync } from "fs";
import { Game } from "./objects/Game";
import startWebsocket from "./websocket";
import { Validate } from "./utils/validate";

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

if (Validate.config(conf)) {
	startWebsocket(conf);
}