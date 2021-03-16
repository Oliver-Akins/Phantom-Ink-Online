import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: RandomizeTeams) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't find game with code: ${data.game_code}`);
			socket.emit(`RandomizedTeams`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `RandomizeTeams`
			});
			return;
		};
		let game = games[data.game_code];

		// Remove all players from all teams
		for (var team of game.teams) {
			team.removePlayers();
		};

		let players = [...game.players];
		// game.log.info(players);
		let new_team: 1|2 = 1;
		while (players.length > 0) {

			let player_index = Math.floor(Math.random() * players.length);
			let player = players[player_index];
			players.splice(player_index, 1);

			game.log.debug(`Randomized ${player.name} onto team ${new_team}`);

			// Move the socket rooms that the player's socket is in
			player.socket?.leave(`${game.id}:*:${player.role}`);
			player.socket?.leave(`${game.id}:${player.team}:${player.role}`);
			player.socket?.join([
				`${game.id}:*:guesser`,
				`${game.id}:${new_team}:guesser`
			]);

			// Update the player's object
			player.role = `guesser`;
			player.team = new_team;

			// Update the team object
			game.teams[new_team - 1].guessers.push(player);

			// Add the next player to the other team
			new_team = new_team == 1 ? 2 : 1;

			// Alert all connected clients that they need to update the UI
			io.to(game.id).emit(`PlayerUpdate`, {
				status: 200,
				action: `modify`,
				name: player.name,
				role: player.role,
				team: player.team,
			});
		};
	}
	catch (err) {
		log.prettyError(err);
		socket.emit(`RandomizedTeams`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `RandomizeTeams`,
		});
	};
};