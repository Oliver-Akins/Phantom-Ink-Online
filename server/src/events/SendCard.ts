import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: SendCard) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `SendCard: Not Implemented Yet`,
			source: `SendCard`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `SendCard`,
		});
	}
};