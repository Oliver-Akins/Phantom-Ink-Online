import { log } from "./main";
import { Server, Socket } from "socket.io";

import CreateGame from "./events/CreateGame";
import UpdatePlayer from "./events/UpdatePlayer";
import JoinGame from "./events/JoinGame";


export default async (conf: config) => {

	const io = new Server();

	io.listen(conf.websocket.port, {
		cors: {
			origin: conf.webserver.hostname,
			credentials: true,
		}
	});

	io.on(`connection`, (socket: Socket) => {
		log.debug(`Client connected with ID: ${socket.id}`);

		// Game Management
		socket.on(`CreateGame`, (data: CreateGame) => CreateGame(io, socket, data));
		// socket.on(`DeleteGame`, (data: DeleteGame) => DeleteGame(io, socket, data));


		// Player Management
		socket.on(`JoinGame`, (data: JoinGame) => JoinGame(io, socket, data));
		socket.on(`UpdatePlayer`, (data: UpdatePlayer) => UpdatePlayer(io, socket, data));
	});

	log.info(`Server started on port ${conf.websocket.port}`);
}