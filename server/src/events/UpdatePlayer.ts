import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: UpdatePlayer) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `UpdatePlayer: Not Implemented Yet`,
			source: `UpdatePlayer`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `UpdatePlayer`,
		});
	}
};