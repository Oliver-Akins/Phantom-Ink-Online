import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: SelectObject) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't choose an object for a game that doesn't exist: ${data.game_code}`);
			socket.emit(`ChosenObject`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `SelectObject`
			});
			return;
		};
		let game = games[data.game_code];

		// Assert that the object is actually a valid choice
		if (!game.objects.includes(data.choice)) {
			game.log.warn(`Someone tried selecting an object that doesn't exist: ${data.choice}`);
			socket.emit(`ChosenObject`, {
				status: 409,
				message: `That object isn't on the card.`,
				source: `SelectObject`
			});
			return;
		};

		game.log.debug(`Object has been chosen: ${data.choice}`);
		game.object = data.choice;
		io.to(game.id).emit(`ChosenObject`, {
			status: 200,
			choice: data.choice,
		});
	}
	catch (err) {
		log.prettyError(err);
		socket.emit(`ChosenObject`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `SelectObject`,
		});
	}
};