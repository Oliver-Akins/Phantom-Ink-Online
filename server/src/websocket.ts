import { log } from "./main";
import { Server, Socket } from "socket.io";

import CreateGame from "./events/CreateGame";


export default async (conf: config) => {

	const io = new Server();

	io.listen(conf.websocket.port, {
		cors: {
			origin: conf.webserver.hostname,
			credentials: true,
		}
	})

	io.on(`connection`, (socket: Socket) => {
		log.debug(`Client connected with ID: ${socket.id}`);

		socket.on(`CreateGame`, (data: CreateGame) => CreateGame(io, socket, data));
	});

	log.info(`Server started on port ${conf.websocket.port}`);
}