import { games, log } from '../main';
import { Player } from '../objects/Player';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: JoinGame) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't join game that doesn't exist: ${data.game_code}`);
			socket.emit(`GameJoined`, {
				status: 404,
				message: `Game with code "${data.game_code}" could not be found`,
				source: `JoinGame`
			});
			return;
		};
		let game = games[data.game_code];


		// Ensure no one has the same name as the player that is joining
		let sameName = game.players.find(x => x.name == data.name);
		if (sameName != null) {
			if (!game.ingame) {
				game.log.info(`Client attempted to connect using name already in use.`);
				socket.emit(`GameJoined`, {
					status: 400,
					message: `A player already has that name in the game.`,
					source: `JoinGame`
				});
				return;
			};

			// Player has the same name but is allowed to rejoin if they
			// disconnect in the middle of the game
			if (!sameName.socket.connected) {
				game.log.info(`Player Reconnected to the game (name=${data.name})`);
				socket.emit(`GameRejoined`, { status: 200 });
				return;
			} else {
				game.log.debug(`${socket.id} attempted to claim ${sameName.socket.id}'s game spot.`);
				socket.emit(`GameJoined`, {
					status: 403,
					message: `Can't connect to an already connected client`,
					source: `JoinGame`
				});
				return;
			};
		};


		// Assert game is not in-progess
		if (game.ingame) {
			game.log.debug(`${data.name} tried to connect in the middle of a game.`);
			socket.emit(`GameJoined`, {
				status: 403,
				message: `Cannot connect to a game that's in progress.`,
				source: `JoinGame`
			});
			return;
		};

		let player = new Player(data.name, socket);
		game.players.push(player);

		game.log.debug(`${data.name} joined the game`);
		socket.join(game.id);
		socket.emit(`GameJoined`, {
			status: 200,
			players: game.playerData,
		});
		socket.to(game.id).emit(`PlayerUpdate`, {
			status: 200,
			action: "new",
			name: player.name,
			players: game.playerData,
		});
	}
	catch (err) {
		socket.emit(`GameJoined`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `JoinGame`,
		});
	}
};