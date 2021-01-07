import { log } from '../main';
import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: any) => {
	try {
		socket.emit(``, {
			status: 501,
			message: `: Not Implemented Yet`,
			source: ``,
		});
	} catch (err) {
		log.prettyError(err);
		socket.emit(``, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: ``,
		});
	}
};