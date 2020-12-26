interface response {
	status: number;
	source?: string;
	message?: string;
}

type team = 1 | 2;
type role = "writer" | "guesser";
type answer = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;


interface CreateGame {
	name: string;
}
interface GameCreated extends response {
	game_code?: string;
}


interface DeleteGame {
	game_code: string;
}
interface GameDeleted extends response {}


interface GetPastQuestions {
	team: team;
}
interface PastQuestions extends response {
	questions?: string[];
}


interface JoinGame {
	game_code: string;
	name: string;
}
interface GameJoined extends response {}


interface NewHand {
	team: team;
}
interface SendCard {
	text: string;
	from: role;
	team: team;
}
interface UpdateHand extends response{
	mode?: "append" | "replace";
	questions?: string[];
}


interface ObjectList {}
interface ObjectListResponse extends response {
	objects?: string[];
}


interface SelectObject {
	object: string;
}
interface ChosenObject extends response {
	object?: string;
}


interface UpdateAnswer {
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
	name: string;
	team: team;
	role: role;
}
interface UpdatePlayerResponse {
	name: string;
	team: team;
	role: role;
}