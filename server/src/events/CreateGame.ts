import { games, log } from '../main';
import { Game } from '../objects/Game';
import { Player } from '../objects/Player';
import { Server, Socket } from 'socket.io';
import { routineCheck } from '../utils/cleanup';

export default (io: Server, socket: Socket, data: CreateGame) => {
	try {
		let host = new Player(data.name, socket, true);

		// Create the game object to save
		let game = new Game(host);
		games[game.id] = game;
		game.log = log.getChildLogger({
			displayLoggerName: true,
			name: game.id,
		});
		game.log.info(`New game created (host=${host.name})`);

		socket.join(game.id);
		socket.emit(`GameCreated`, {
			status: 200,
			game_code: game.id,
			players: game.playerData,
		});

		// Check for any inactive games that are still marked as active
		routineCheck();
	}
	catch (err) {
		socket.emit(`GameCreated`, {
			status: 500,
			message: err.message,
			source: `CreateGame`,
		});
	}
};