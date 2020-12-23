import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: SelectObject) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `SelectObject: Not Implemented Yet`,
			source: `SelectObject`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `SelectObject`,
		});
	}
};