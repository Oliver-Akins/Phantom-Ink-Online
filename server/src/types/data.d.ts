interface response {
	status: number;
	source?: string;
	message?: string;
}

type team = 1 | 2;
type role = "writer" | "guesser";
type answer = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Player specific data
interface player {
	name: string;
	role: role | null;
	team: team | null;
}



interface CreateGame {
	name: string;
}
interface GameCreated extends response {
	game_code?: string;
	players?: player[]
}


interface DeleteGame {
	game_code: string;
}
interface GameDeleted extends response {}


interface GetPastQuestions {
	game_code: string;
	team: team;
}
interface PastQuestions extends response {
	questions?: string[];
}


interface JoinGame {
	game_code: string;
	name: string;
}
interface GameJoined extends response {
	players?: player[];
}
interface GameRejoined extends response {
	players?: player[];
}


interface NewHand {
	game_code: string;
	team: team;
}
interface SendCard {
	game_code: string;
	text: string;
	from: role;
	team: team;
}
interface UpdateHand extends response{
	mode?: "append" | "replace";
	questions?: string[];
}


interface ObjectList {
	game_code: string;
}
interface ObjectListResponse extends response {
	objects?: string[];
}


interface SelectObject {
	game_code: string;
	object: string;
}
interface ChosenObject extends response {
	object?: string;
}


interface UpdateAnswer {
	game_code: string;
	answer: answer;
	value: string;
	team: team;
}
interface UpdateAnswerResponse extends response {
	answer: answer;
	value: string;
	team: team;
}


interface UpdatePlayer {
	action: "modify" | "remove";
	game_code: string;
	name: string;
	from?: {
		team: team;
		role: role;
	};
	to?: {
		team: team;
		role: role;
	};
}
interface PlayerUpdate extends response {
	action?: "modify" | "new" | "remove";
	name?: string; // action: all
	team?: team; // action: "modify"
	role?: role; // action: "modify"
}