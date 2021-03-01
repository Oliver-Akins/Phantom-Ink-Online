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

		// Randomly assign each player to a team (only on mediums, let players
		// pick which of them is the spirit)
		for (var player of game.players) {
			let new_team: 1|2 = Math.floor(Math.random() * 2) + 1 as 1|2;
			player.team = new_team;
			player.role = `guesser`;
			game.log.debug(`Set ${player.name} to a medium on team ${player.team}`);
		};

		game.log.info(`Randomized all players`);
		// Send the new player list to all players
		io.to(game.id).send(`RandomizedTeams`, {
			status: 200,
			players: game.playerData
		});
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