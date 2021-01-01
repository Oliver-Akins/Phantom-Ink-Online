import { Game } from '../objects/Game';
import { Player } from '../objects/Player';
import { Server, Socket } from 'socket.io';
import { conf, games, log } from '../main';

export default (io: Server, socket: Socket, data: CreateGame) => {
	try {
		let host = new Player(data.name, socket, true);

		// Create the game object to save
		let game = new Game(conf, host);
		games[game.id] = game;
		game.players.push(host);
		log.info(`New game created with ID ${game.id} (host=${host.name})`);

		socket.join(game.id);
		socket.emit(`GameCreated`, {
			status: 200,
			game_code: game.id,
			players: game.playerData,
		});
	}
	catch (err) {
		socket.emit(`GameCreated`, {
			status: 500,
			message: err.message,
			source: `CreateGame`,
		});
	}
};