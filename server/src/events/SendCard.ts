import { Server, Socket } from 'socket.io';
import { conf, games, log } from '../main';

export default (io: Server, socket: Socket, data: SendCard) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't fing a game with code: ${data.game_code}`);
			socket.emit(`UpdateHand`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `SendCard`
			});
			return;
		};
		let game = games[data.game_code];
		let team = game.teams[data.team - 1];
		let deck = game.questions;

		// The writer is answering
		if (data.from === "writer") {
			game.log.debug(`Writer selected question to answer`);

			// Draw new cards for team
			deck.discard(data.text);
			team.selectQuestion(data.text);

			// Get any additional cards needed
			let needed_cards = conf.game.hand_size - team.hand.length;
			if (needed_cards > 0) {
				team.addCardsToHand(game.questions.draw(needed_cards));
			};

			socket.emit(`UpdateHand`, {
				status: 200,
				mode: "replace",
				questions: []
			});
			io.to(`${game.id}:${team.id}:guesser`).emit(`UpdateHand`, {
				status: 200,
				mode: "replace",
				questions: team.hand
			});
			return;
		}

		// The writer is sending the card to the writer
		else if (data.from === "guesser") {
			game.log.debug(`Guesser is sending a card to the writer`);

			// Update the team's hand
			team.askSpirit(data.text);

			// send the question text to the writer player
			io.to(`${game.id}:${team.id}:writer`).emit(`UpdateHand`, {
				status: 200,
				mode: "append",
				questions: [data.text]
			});

			// Alert all the guessers of the team
			io.to(`${game.id}:${team.id}:guesser`).emit(`UpdateHand`, {
				status: 200,
				mode: "replace",
				questions: team.hand
			});
			return;
		}

		else {
			game.log.warn(`Unknown role in the "from" property: ${data.from}`);
			socket.emit(`UpdateHand`, {
				status: 400,
				message: `Unknown role in the "from" property: ${data.from}`,
				source: `SendCard`
			});
			return;
		};
	}
	catch (err) {
		log.prettyError(err);
		socket.emit(`UpdateHand`, {
			status: 500,
			message: err.message,
			source: `SendCard`,
		});
	}
};