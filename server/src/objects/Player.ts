import { Socket } from "socket.io";

export class Player {
	readonly name: string;
	public team: team|null = null;
	public role: role|null = null;
	public socket: Socket;
	readonly isHost: boolean;

	constructor(name: string, socket: Socket, isHost=false) {
		this.name = name;
		this.socket = socket;
		this.isHost = isHost;
	};
};