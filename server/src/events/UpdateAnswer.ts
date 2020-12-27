import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: UpdateAnswer) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `UpdateAnswer`
			});
			return;
		};
		let game = games[data.game_code];
		let team = game.teams[data.team - 1];

		// Update the answers for the other players to keep them in sync
		team.modifyAnswer(data.answer, data.value);
		socket.to(game.id).emit(`UpdateAnswer`, {
			answer: data.answer,
			value: data.value,
			team: data.team
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `UpdateAnswer`,
		});
	}
};