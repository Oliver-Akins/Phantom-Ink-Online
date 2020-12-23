import * as toml from "toml";
import { Logger } from "tslog";
import { readFileSync } from "fs";
import startWebsocket from "./websocket";

let conf: config = toml.parse(readFileSync(`server.toml`, `utf-8`));

export const log: Logger = new Logger({
	displayFunctionName: false,
	displayLoggerName: false,
	displayFilePath: `hidden`,
	displayLogLevel: true,
	minLevel: conf.log.level,
	name: conf.log.name,
});

startWebsocket(conf);