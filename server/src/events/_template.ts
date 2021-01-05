import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: any) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `: Not Implemented Yet`,
			source: ``,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: ``,
		});
	}
};