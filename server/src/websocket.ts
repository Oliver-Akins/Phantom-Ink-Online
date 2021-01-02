import { log } from "./main";
import { Server, Socket } from "socket.io";

import JoinGame from "./events/JoinGame";
import LeaveGame from "./events/LeaveGame";
import CreateGame from "./events/CreateGame";
import DeleteGame from "./events/DeleteGame";
import UpdatePlayer from "./events/UpdatePlayer";


export default async (conf: config) => {

	const io = new Server();

	io.listen(conf.websocket.port, {
		cors: {
			origin: conf.websocket.permitted_hosts,
			credentials: true,
		}
	});

	io.on(`connection`, (socket: Socket) => {
		log.debug(`Client connected with ID: ${socket.id}`);

		// Game Management
		socket.on(`CreateGame`, (data: CreateGame) => CreateGame(io, socket, data));
		socket.on(`DeleteGame`, (data: DeleteGame) => DeleteGame(io, socket, data));


		// Player Management
		socket.on(`JoinGame`, (data: JoinGame) => JoinGame(io, socket, data));
		socket.on(`UpdatePlayer`, (data: UpdatePlayer) => UpdatePlayer(io, socket, data));
		socket.on(`LeaveGame`, (data: LeaveGame) => LeaveGame(io, socket, data));
	});

	log.info(`Server started on port ${conf.websocket.port}`);
}