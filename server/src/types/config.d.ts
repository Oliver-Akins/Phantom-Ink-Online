interface config {
	log: {
		level: `silly` | `debug` | `info` | `error` | `warn` | `fatal` | `trace`;
		name: string;
	};
	websocket: {
		port: number;
		permitted_hosts: string | string[];
	};
	webserver: {
		enabled: boolean;
		port: number;
	};
	game: {
		hand_size: number;
		code_length: number;
		writer_name: string;
		guesser_name: string;
		cards: {
			type: `csv` | `sheets`;
			key?: string;
			questions: string;
			objects: string;
		};
	};
}