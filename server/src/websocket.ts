import { log } from "./main";
import { Server, Socket } from "socket.io";

import GetHand from "./events/GetHand";
import NewHand from "./events/NewHand";
import JoinGame from "./events/JoinGame";
import SendCard from "./events/SendCard";
import LeaveGame from "./events/LeaveGame";
import StartGame from "./events/StartGame";
import CreateGame from "./events/CreateGame";
import DeleteGame from "./events/DeleteGame";
import ObjectList from "./events/ObjectList";
import UpdatePlayer from "./events/UpdatePlayer";
import SelectObject from "./events/SelectObject";
import UpdateAnswer from "./events/UpdateAnswer";
import GetPastQuestions from "./events/GetPastQuestions";


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
		socket.on(`StartGame`, (data: StartGame) => StartGame(io, socket, data));
		socket.on(`DeleteGame`, (data: DeleteGame) => DeleteGame(io, socket, data));


		// Player Management
		socket.on(`JoinGame`, (data: JoinGame) => JoinGame(io, socket, data));
		socket.on(`UpdatePlayer`, (data: UpdatePlayer) => UpdatePlayer(io, socket, data));
		socket.on(`LeaveGame`, (data: LeaveGame) => LeaveGame(io, socket, data));


		// Game Mechanisms
		socket.on(`ObjectList`, (data: ObjectList) => ObjectList(io, socket, data));
		socket.on(`SelectObject`, (data: SelectObject) => SelectObject(io, socket, data));
		socket.on(`GetHand`, (data: GetHand) => GetHand(io, socket, data));
		socket.on(`NewHand`, (data: NewHand) => NewHand(io, socket, data));
		socket.on(`SendCard`, (data: SendCard) => SendCard(io, socket, data));
		socket.on(`UpdateAnswer`, (data: UpdateAnswer) => UpdateAnswer(io, socket, data));
		socket.on(`GetPastQuestions`, (data: GetPastQuestions) => GetPastQuestions(io, socket, data));
	});

	log.info(`Server started on port ${conf.websocket.port}`);
}