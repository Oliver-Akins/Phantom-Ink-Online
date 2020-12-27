import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: SelectObject) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `SelectObject`
			});
			return;
		};
		let game = games[data.game_code];

		// Assert that the object is actually a valid choice
		if (!game.objects.includes(data.object)) {
			log.warn(`[${game.id}] Someone tried selecting an object that doesn't exist: ${data.object}`);
			socket.emit(`Error`, {
				status: 409,
				message: `That object isn't on the card.`,
				source: `SelectObject`
			});
			return;
		};

		log.debug(`[${game.id}] Object has been chosen: ${data.object}`);
		game.object = data.object;
		io.to(game.id).emit(`ChosenObject`, {
			object: data.object
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `SelectObject`,
		});
	}
};