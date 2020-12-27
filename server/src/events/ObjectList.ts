import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: ObjectList) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `ObjectList`
			});
			return;
		};
		let game = games[data.game_code];

		log.silly(`[${game.id}] Sent client object card.`);
		socket.emit(`ObjectList`, {
			objects: game.objects
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `ObjectList`,
		});
	}
};