import { readFileSync } from 'fs';
import { Game } from '../objects/Game';
import { Player } from '../objects/Player';
import { Server, Socket } from 'socket.io';
import { games, hibernatedGames, log, conf } from '../main';

export default (io: Server, socket: Socket, data: JoinGame) => {
	try {
		// Check if the game is hibernated so that we can re-instantiate the
		// Game object and bring it back to being alive
		let hibernatedIndex = hibernatedGames.indexOf(data.game_code)
		if (hibernatedIndex >= 0) {
			log.info(`Recreating game from datastore.`);

			let datastore = JSON.parse(readFileSync(
				`${conf.datastores.directory}/${data.game_code}.${conf.datastores.filetype}`,
				`utf-8`
			)) as datastoreGame;
			let host = new Player(data.name, socket, true);
			let game = Game.fromJSON(host, datastore);
			game.log = log.getChildLogger({
				displayLoggerName: true,
				name: game.id,
			});

			// Get the specific information for team
			let playerData = datastore.players.find(p => p.name === data.name);
			if (playerData) {
				host.role = playerData.role;
				host.team = playerData.team;
			};

			let hand: string[] = [];
			if (host.team) {
				let team = game.teams[host.team - 1];
				hand = team.hand;
				switch (host.role) {
					case "guesser":
						game.log.silly(`${host.name} is one of the team's guessers`);
						team.guessers.push(host);
						socket.join([
							`${game.id}:*:guesser`,
							`${game.id}:${team.id}:guesser`
						]);
						break;
					case "writer":
						game.log.silly(`${host.name} is the team's writer`);
						team.writer = host;
						socket.join([
							`${game.id}:*:writer`,
							`${game.id}:${team.id}:writer`
						]);
						break;
				};
				game.log.debug(`Host assigned to team`);
			};

			hibernatedGames.splice(hibernatedIndex, 1);
			games[game.id] = game;

			game.log.info(`Successfully unhibernated`);
			socket.join(game.id);
			socket.emit(`GameRejoined`, {
				status: 200,
				ingame: game.ingame,
				role: host.role,
				team: host.team,
				is_host: true,
				players: game.playerData,
				chosen_object: game.object,
				hand: hand,
				answers: {
					team_1: game.teams[0].answers,
					team_2: game.teams[1].answers,
				},
			});
			return;
		};

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


		/*
		Ensure that if the socket is attempting to reconnect to the game, that
		the player they are connecting to does not have actively connected
		socket. This will also function as the main game joining for hibernated
		games that were reloaded from disk.
		*/
		let sameName = game.players.find(x => x.name == data.name);
		if (sameName != null) {

			if (!sameName.socket?.connected) {
				sameName.socket = socket;
				game.log.info(`Player Reconnected to the game (name=${data.name})`);

				// Get the hand of the player's team
				let hand: string[] = [];
				if (sameName.team) {
					hand = game.teams[sameName.team - 1].hand;
				};

				socket.emit(`GameRejoined`, {
					status: 200,
					ingame: game.ingame,
					role: sameName.role,
					team: sameName.team,
					is_host: sameName.isHost,
					players: game.playerData,
					chosen_object: game.object,
					answers: {
						team_1: game.teams[0].answers,
						team_2: game.teams[1].answers,
					},
					hand: hand,
				});
				return;
			} else {
				game.log.debug(`${socket.id} attempted to join with a name already in use ${data.name}`);
				socket.emit(`GameJoined`, {
					status: 403,
					message: `A player already has that name in the game.`,
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