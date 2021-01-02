import { Server, Socket } from 'socket.io';
import { conf, games, log } from '../main';

export default (io: Server, socket: Socket, data: StartGame) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Could not find a game with ID ${data.game_code} to start`);
			socket.emit(`GameJoined`, {
				status: 404,
				message: `Game with code "${data.game_code}" could not be found`,
				source: `StartGame`,
			});
			return;
		};
		let game = games[data.game_code];

		// Make sure we can't start a game that is already started
		if (game.ingame) {
			socket.emit(`GameStarted`, {
				status: 405,
				message: `Can't start a game that is already started`,
				source: `StartGame`
			});
			return;
		};

		// Ensure the questions deck got populated
		if (game.questions.size <= 0) {
			game.log.error(`Questions deck has no cards before the game started.`);
			socket.emit(`GameStarted`, {
				status: 507,
				message: `Questions deck failed to parse, try again in a few seconds or start a new game.`,
				source: `StartGame`
			});
			return;
		};

		for (var team of game.teams) {
			if (team.writer == null) {
				game.log.info(`No writer on team ${team.id}, aborting start.`);
				socket.emit(`GameStarted`, {
					status: 418,
					message: `A team doesn't have a ${conf.game.writer_name}.`,
					source: `StartGame`
				});
				return;
			} else if (team.guessers.length <= 0) {
				game.log.info(`No guessers on team ${team.id}, aborting start.`);
				socket.emit(`GameStarted`, {
					status: 418,
					message: `A team does not have any ${conf.game.guesser_name}s.`,
					source: `StartGame`
				});
				return;
			};
		};

		// Start the game
		game.ingame = true;
		game.teams[0].addCardsToHand(game.questions.draw(conf.game.hand_size));
		game.teams[1].addCardsToHand(game.questions.draw(conf.game.hand_size));

		io.to(game.id).emit(`GameStarted`, { status: 200 });
	}
	catch (err) {
		socket.emit(`GameStarted`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: ``,
		});
	}
};