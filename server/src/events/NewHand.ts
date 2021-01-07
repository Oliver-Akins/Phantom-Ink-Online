import { games, log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: NewHand) => {
	try {

		// Assert game exists
		if (!games[data.game_code]) {
			log.debug(`Can't find game with code: ${data.game_code}`);
			socket.emit(`UpdateHand`, {
				status: 404,
				message: `Game with code ${data.game_code} could not be found`,
				source: `NewHand`
			});
			return;
		};
		let game = games[data.game_code];
		let team = game.teams[data.team - 1];
		let deck = game.questions;

		/**
		 * The amount of cards that the team has in their hand prior to
		 * discarding all of their hand, this is used to make sure that they
		 * get back the same number of cards that they had in their hand.
		 */
		let handSize = team.hand.length;

		// Empty the medium's hand to the discard pile so we know where the
		// cards are.
		for (var card of team.hand) {
			deck.discard(card);
			team.removeCard(card);
			game.log.silly(`Removing card: '${card}' from team ${data.team}'s hand.`);
		};

		// Add the questions and then alert the game clients about the changes
		team.addCardsToHand(deck.draw(handSize));
		game.log.silly(`Drew a new hand of cards for team ${data.team}.`);
		io.to(game.id).emit(`UpdateHand`, {
			status: 200,
			mode: `replace`,
			questions: team.hand,
		});
	}
	catch (err) {
		socket.emit(`UpdateHand`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `NewHand`,
		});
	}
};