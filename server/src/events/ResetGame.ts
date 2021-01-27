import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: ResetGame) => {
	try {
		if (!games[data.game_code]) {
			log.debug(`Can't find game with code: ${data.game_code}`);
			socket.emit(`GameReset`, {
				status: 404,
				message: `Can't find game with code: ${data.game_code}`,
				source: `ResetGame`
			});
			return;
		};
		let game = games[data.game_code];
		game.log.info(`Resetting game`);

		game.teams.forEach(t => t.reset());
		game.questions.reset();
		game.resetObject();
		game.ingame = false;

		io.to(game.id).emit(`GameReset`, { status: 200 });
	} catch (err) {
		log.prettyError(err);
		socket.emit(`GameReset`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `ResetGame`,
		});
	}
};