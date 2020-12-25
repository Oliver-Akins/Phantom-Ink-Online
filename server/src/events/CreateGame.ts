import { Game } from '../objects/Game';
import { Player } from '../objects/Player';
import { Server, Socket } from 'socket.io';
import { conf, games, log } from '../main';

export default (io: Server, socket: Socket, data: CreateGame) => {
	try {

		// Create the game object to save
		let game = new Game(conf);
		games[game.id] = game;
		log.info(`New game created with ID ${game.id}`);

		// Register the player with the game
		let host = new Player(data.name, socket, true);
		game.players.push(host);

		socket.emit(`GameCreated`, {
			status: 200,
			game_code: game.id,
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `CreateGame`,
		});
	}
};