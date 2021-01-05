import { log } from "../main";

export class Validate {
	public static config(conf: config) {

		let valid = true;

		// Assert data in log object:
		if (![`silly`,`debug`,`info`,`error`,`fatal`,`warn`,`trace`].includes(conf.log.level)) {
			log.error(`Unknown log level: ${conf.log.level}`);
			valid = false;
		};

		// Assert data in the game object
		if (![`csv`].includes(conf.game.cards.type)) {
			log.error(`Unsupported cards type: ${conf.game.cards.type}`);
			valid = false;
		};

		if (conf.game.cards.type == `sheets` && !conf.game.cards.key) {
			log.error(`Cannot have game.cards.type set to "sheets" and not have the game.cards.key set.`);
			valid = false;
		};

		if (conf.game.code_length <= 1) {
			log.error(`Game codes can't have <= 1 characters: ${conf.game.code_length}`);
			valid = false;
		}

		if (!conf.websocket.permitted_hosts) {
			log.error(`Can't have a blank or null websocket.permitted_hosts`);
			valid = false;
		};

		if (!conf.datastores) {
			log.error(`Datastores object must be defined`);
			valid = false;
		} else {
			if (conf.datastores.enabled == null) {
				log.error(`datastores.enabled must be defined`);
				valid = false;
			};

			if (conf.datastores.enabled && conf.datastores.directory?.length > 0) {
				log.error(`datastores.directory must be a filepath if datastores.enabled is set to true`);
				valid = false;
			};
		};

		// Config is valid
		return valid;
	};
};