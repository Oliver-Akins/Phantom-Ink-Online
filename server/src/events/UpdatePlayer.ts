import { conf, games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: UpdatePlayer) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `UpdatePlayer`
			});
			return;
		};

		// Execute the corresponding action code
		switch (data.action) {
			case "modify":
				modifyPlayer(io, socket, data);
				break;
			case "remove":
				removePlayer(io, socket, data);
				break;
			default:
				socket.emit(`Error`, {
					status: 400,
					message: `Unknown player action: ${data.action}`,
					source: `UpdatePlayer`,
				});
		};
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `UpdatePlayer`,
		});
	}
};


const modifyPlayer = (io: Server, socket: Socket, data: UpdatePlayer): void => {
	let game = games[data.game_code];
	let player = game.players.find(x => x.name === data.name);

	// Ensure that the player was found correctly so it is not undefined
	if (player == null) {
		log.debug(`Can't modify a player that doesn't exist. (name=${data.name},gID=${game.id})`);
		socket.emit(`Error`, {
			status: 404,
			message: `Cannot find player with the name: ${data.name}`,
			source: `UpdatePlayer.Modify`
		});
		return;
	};

	// Assert the player is modifying themselves
	if (player.socket !== socket) {
		log.debug(`${socket.id} is trying to modify a different player: ${data.name} (gID=${game.id})`);
		socket.emit(`Error`, {
			status: 403,
			message: `Cannot modify other players`,
			source: `UpdatePlayer.Modify`
		});
		return;
	};


	// Check if the player is just swapping roles on the same team
	if (data.from.team === data.to.team) {
		let team = game.teams[data.to.team - 1];
		switch (data.to.role) {
			case "guesser":
				if (team.guessers.length >= 7) {
					socket.emit(`Error`, {
						status: 403,
						message: `A team can't have 8 or more ${conf.game.guesser_name}`,
						source: `UpdatePlayer.Modify`
					});
					return;
				}
				team.guessers.push(player);
				team.writer = null;
				break;
			case "writer":
				if (team.writer) {
					socket.emit(`Error`, {
						status: 403,
						message: `Someone on that team is already the ${conf.game.writer_name}`,
						source: `UpdatePlayer.Modify`
					});
					return;
				};
				// Change team object
				team.writer = player;
				team.guessers = team.guessers.filter(x => x.socket !== socket);
				break;
		};
	}

	// The player is swapping roles and teams
	else {
		let oldTeam = game.teams[data.from.team - 1];
		let newTeam = game.teams[data.to.team - 1];

		// Add the player to the new team to make sure that it's a valid move
		switch (data.to.role) {
			case "guesser":

				// Ensure we don't get 8 guessers
				if (newTeam.guessers.length >= 7) {
					socket.emit(`Error`, {
						status: 403,
						message: `Cannot have 8 players as ${conf.game.guesser_name}s on a single team.`,
						source: `UpdatePlayer.Modify`
					});
					return;
				};
				newTeam.guessers.push(player);
				break;


			case "writer":

				// Ensure we don't already have a writer
				if (newTeam.writer) {
					socket.emit(`Error`, {
						status: 403,
						message: `Someone on that team is already the ${conf.game.writer_name}`,
						source: `UpdatePlayer.Modify`
					});
					return;
				};
				newTeam.writer = player;
				break;
		};

		// Remove the player from their old team since we've added them to the
		// new team
		switch (data.from.role) {
			case "guesser":
				oldTeam.guessers = oldTeam.guessers.filter(x => x.socket !== socket);
				break;
			case "writer":
				oldTeam.writer = null;
				break;
		};
	};

	io.to(game.id).emit(`UpdatePlayer`, {
		status: 200,
		name: data.name,
		role: data.to.role,
		team: data.to.team,
	});
};


const removePlayer = (io: Server, socket: Socket, data: UpdatePlayer): void => {
	let game = games[data.game_code];
	let player = game.players.find(x => x.name === data.name);
	let host = game.host;

	// Ensure that the player was found correctly so it is not undefined
	if (player == null) {
		log.debug(`Can't modify a player that doesn't exist. (name=${data.name},gID=${game.id})`);
		socket.emit(`Error`, {
			status: 404,
			message: `Cannot find player with the name: ${data.name}`,
			source: `UpdatePlayer.Remove`
		});
		return;
	};

	// Ensure that the player who is removing the player is the host
	if (host.socket !== socket) {
		socket.emit(`Error`, {
			status: 403,
			message: `Cannot kick a player when you are not the host`,
			source: `UpdatePlayer.Remove`
		});
		return;
	};

	// Remove the player from the team object so it doesn't interfere with
	// other players changing their team data
	for (var team of game.teams) {
		if (team.writer == player) {
			team.writer = null;
			log.silly(`Removed ${player.name} from the writer role.`);
		} else if (team.guessers.includes(player)) {
			team.guessers = team.guessers.filter(x => x !== player);
			log.silly(`Removed ${player.name} from the guesser role`);
		};
	};

	game.players = game.players.filter(x => x !== player);

	log.info(`${host.name} kicked ${player.name} from game ${game.id}`);
	io.to(game.id).emit(`UpdatePlayer`, {
		action: "remove",
		name: player.name,
	});
};