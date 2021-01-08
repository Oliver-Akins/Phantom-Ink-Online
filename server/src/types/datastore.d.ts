interface datastorePlayer {
	team: team | null;
	role: role | null;
	host: boolean;
	name: string;
}

type datastoreQuestionCard = string;
type datastoreObjectCard = string[];

interface datastoreTeam {
	questions: datastoreQuestionCard[];
	hand: datastoreQuestionCard[];
	answers: string[];
	id: team;
}

interface datastoreDeck<T> {
	discard: T[];
	unknown: T[];
	deck: T[];
}

interface datastoreGame {
	decks: {
		questions: datastoreDeck<question_deck>;
		objects: datastoreDeck<object_deck>;
	};
	objectCard: datastoreObjectCard|null;
	players: datastorePlayer[];
	teams: datastoreTeam[];
	ingame: boolean;
	object: string;
	id: string;
}