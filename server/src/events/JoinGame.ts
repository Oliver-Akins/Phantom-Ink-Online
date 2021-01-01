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
				socket.emit(`GameRejoined`, { status: 200 });
				return;
			} else {
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
			socket.emit(`GameJoined`, {
				status: 403,
				message: `Cannot connect to a game that's in progress.`,
				source: `JoinGame`
			});
			return;
		};

		let player = new Player(data.name, socket);
		game.players.push(player);

		socket.emit(`GameJoined`, {});
		socket.to(game.id).emit(`PlayerUpdate`, {
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