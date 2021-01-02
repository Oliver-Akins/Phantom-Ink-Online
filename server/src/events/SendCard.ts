import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: SendCard) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't send a card in a game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
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
			game.log.debug(` Writer selected question to answer.`);
			deck.discard(data.text);
			team.selectQuestion(data.text);

			socket.emit(`UpdateHand`, {
				mode: "replace",
				questions: []
			});
			return;
		}

		// The writer is sending the card to the writer
		else if (data.from === "guesser") {
			game.log.debug(`Guesser is sending the card to the writer.`);

			// Update the team's hand
			team.removeCard(data.text);
			team.addCardsToHand(game.questions.draw(1));

			// send the question text to the writer player
			io.to(`${game.id}:${data.team}:writer`).emit(`UpdateHand`, {
				mode: "append",
				questions: data.text
			});

			// Alert all the guessers of the
			io.to(`${game.id}:${data.team}:guesser`).emit(`UpdateHand`, {
				mode: "replace",
				questions: team.hand
			});
			return;
		}

		else {
			game.log.warn(`Unknown role in the "from" property: ${data.from}`);
			socket.emit(`Error`, {
				status: 400,
				message: `Unknown role in the "from" property: ${data.from}`,
				source: `SendCard`
			});
			return;
		};
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `SendCard`,
		});
	}
};