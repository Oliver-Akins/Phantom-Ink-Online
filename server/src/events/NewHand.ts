import { conf, games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: NewHand) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't delete game that doesn't exist: ${data.game_code}`);
			socket.emit(`Error`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `NewHand`
			});
			return;
		};
		let game = games[data.game_code];
		let team = game.teams[data.team - 1];
		let deck = game.questions;

		// Empty the medium's hand to the discard pile so we know where the
		// cards are.
		for (var card of team.hand) {
			deck.discard(card);
			team.removeCard(card);
			log.silly(`[${game.id}] Removing card: '${card}' from team ${data.team}'s hand.`);
		};

		// Add the questions and then alert the game clients about the changes
		team.addCardsToHand(deck.draw(conf.game.hand_size));
		log.silly(`[${game.id}] Drew a new hand of cards for team ${data.team}.`);
		io.to(game.id).emit(`UpdateHand`, {
			mode: `replace`,
			questions: team.hand,
		});
	}
	catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `NewHand`,
		});
	}
};