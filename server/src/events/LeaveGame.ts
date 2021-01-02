import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: LeaveGame) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Could not find a game with ID ${data.game_code} to leave`);
			socket.emit(`GameJoined`, {
				status: 404,
				message: `Game with code "${data.game_code}" could not be found`,
				source: `JoinGame`,
			});
			return;
		};
		let game = games[data.game_code];

		// Ensure it's not the host trying to leave so that the game can
		// actually start
		if (game.host.socket == socket) {
			game.log.debug(`Host attempted to leave game. (name=${game.host.name})`);
			socket.emit(`GameLeft`, {
				status: 303,
				message: `Can't leave the game as the host, use "DeleteGame".`,
				source: `LeaveGame`,
			});
			return;
		};

		let player = game.players.find(p => p.socket === socket);

		// Ensure we found a player
		if (player != null) {
			let role = player.role;
			let teamID = player.team;

			// Ensure the team is defined
			if (teamID) {
				let team = game.teams[teamID - 1];

				switch (role) {
					case "guesser":
						game.log.silly(`Removed ${player.name} from guesser role.`);
						team.guessers = team.guessers.filter(p => p.socket !== socket);
						break;
					case "writer":
						game.log.silly(`Removed ${player.name} from writer role.`);
						team.writer = null;
						break;
				};

			};

			game.players = game.players.filter(p => p.socket != socket);

			game.log.debug(`${player.name} left the game.`);
			socket.to(game.id).emit(`PlayerUpdate`, {
				status: 200,
				action: `remove`,
				players: game.playerData,
			});
			socket.emit(`GameLeft`, { status: 200 });
		};
	}
	catch (err) {
		socket.emit(`GameLeft`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: ``,
		});
	}
};