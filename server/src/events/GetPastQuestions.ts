import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket, data: GetPastQuestions) => {
	try {
		socket.emit(`Error`, {
			status: 501,
			message: `GetPastQuestions: Not Implemented Yet`,
			source: `GetPastQuestions`,
		});
	} catch (err) {
		socket.emit(`Error`, {
			status: 500,
			message: `${err.name}: ${err.message}`,
			source: `GetPastQuestions`,
		});
	}
};