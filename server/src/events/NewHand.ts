import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: NewHand) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `NewHand: Not Implemented Yet`,
			source: `NewHand`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `NewHand`,
		});
	}
};