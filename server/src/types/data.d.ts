interface response {
	status: number;
	source?: String;
	message?: String;
}

type team = 1 | 2;
type role = "writer" | "guesser";
type answer = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;


interface CreateGame {
	name: String;
}
interface GameCreated extends response {
	game_code?: String;
	id?: String;
}


interface GetPastQuestions {
	team: team;
}
interface PastQuestions extends response {
	questions?: String[];
}


interface JoinGame {
	game_code: String;
	name: String;
	id?: String;
}
interface GameJoined extends response {
	id?: String;
}


interface NewHand {
	team: team;
}
interface SendCard {
	text: String;
	from: role;
	team: team;
}
interface UpdateHand extends response{
	mode?: "append" | "replace";
	questions?: String[];
}


interface ObjectList {}
interface ObjectListResponse extends response {
	objects?: String[];
}


interface SelectObject {
	object: String;
}
interface ChosenObject extends response {
	object?: String;
}


interface UpdateAnswer {
	answer: answer;
	value: String;
	team: team;
}
interface UpdateAnswerResponse extends response {
	answer: answer;
	value: String;
	team: team;
}


interface UpdatePlayer {
	name: String;
	team: team;
	role: role;
}
interface UpdatePlayerResponse {
	name: String;
	team: team;
	role: role;
}