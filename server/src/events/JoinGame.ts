import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: JoinGame) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `JoinGame: Not Implemented Yet`,
			source: `JoinGame`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `JoinGame`,
		});
	}
};