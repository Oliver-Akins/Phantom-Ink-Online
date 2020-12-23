import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: CreateGame) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `CreateGame: Not Implemented Yet`,
			source: `CreateGame`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `CreateGame`,
		});
	}
};