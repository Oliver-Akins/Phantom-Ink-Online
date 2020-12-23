import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: UpdateAnswer) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `UpdateAnswer: Not Implemented Yet`,
			source: `UpdateAnswer`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `UpdateAnswer`,
		});
	}
};