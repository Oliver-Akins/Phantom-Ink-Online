import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: DeleteGame) => {
	try {

		// Ensure game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `DeleteGame`
			});
			return;
		};

		let game = games[data.game_code];

		// Ensure user is the host
		let player = game.players.find(x => x.isHost);

		if (player != null && player.socket !== socket) {
			log.warn(`${player.name} attempted to delete game ${game.id}.`);
			socket.emit(`Error`, {
				status: 403,
				message: `Not allowed to delete a game that you are not the host of.`,
				source: `DeleteGame`
			});
			return;
		};

		// Delete game
		delete games[data.game_code];
		socket.emit(`GameDeleted`, { status: 200 });
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `DeleteGame`,
		});
	};
};