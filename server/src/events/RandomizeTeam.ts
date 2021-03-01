import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: RandomizeTeam) => {
	try {
		socket.emit(`RandomizeTeam`, {
			status: 501,
			message: `Not Implemented Yet`,
			source: `RandomizeTeam`,
		});

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
	}
	catch (err) {
		log.prettyError(err);
		socket.emit(`RandomizeTeam`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `RandomizeTeam`,
		});
	};
};