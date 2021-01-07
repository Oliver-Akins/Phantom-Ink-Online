import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: ObjectList) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't get objects for game that doesn't exist: ${data.game_code}`);
			socket.emit(`ObjectList`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `ObjectList`
			});
			return;
		};
		let game = games[data.game_code];

		game.log.silly(`Sent client object card`);
		socket.emit(`ObjectList`, {
			objects: game.objects
		});
	}
	catch (err) {
		log.prettyError(err);
		socket.emit(`ObjectList`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `ObjectList`,
		});
	}
};