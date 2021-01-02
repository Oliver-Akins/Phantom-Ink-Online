import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: GetPastQuestions) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't get questions game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `GetPastQuestions`
			});
			return;
		};
		let game = games[data.game_code];
		let team = game.teams[data.team - 1];

		game.log.silly(`Past questions retrieved for team ${data.team}`);
		socket.emit(`PastQuestions`, {
			questions: team.questions
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `GetPastQuestions`,
		});
	}
};