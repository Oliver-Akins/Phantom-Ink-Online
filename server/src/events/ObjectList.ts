import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: ObjectList) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `ObjectList: Not Implemented Yet`,
			source: `ObjectList`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `ObjectList`,
		});
	}
};