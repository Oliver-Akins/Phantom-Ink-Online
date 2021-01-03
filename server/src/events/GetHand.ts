import { Server, Socket } from 'socket.io';
import { games, log } from '../main';

export default (io: Server, socket: Socket, data: GetHand) => {
	try {
		if (!games[data.game_code]) {
			log.debug(`Can't find game with code: ${data.game_code}`);
			socket.emit(`UpdateHand`, {
				status: 404,
				message: `Can't find game with code: ${data.game_code}`,
				source: `GetHand`
			});
			return;
		};
		let game = games[data.game_code];
		let hand = game.teams[data.team - 1].hand;

		game.log.silly(`Client requested guesser hand`);
		socket.emit(`UpdateHand`, {
			status: 200,
			mode: "replace",
			questions: hand
		});
	}
	catch (err) {
		socket.emit(`QuestionList`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `GetQuestions`,
		});
	}
};