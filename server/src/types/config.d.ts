interface config {
	log: {
		level: `silly` | `debug` | `info` | `error` | `warn` | `fatal` | `trace`;
		name: string;
	};
	websocket: {
		port: number;
	};
	webserver: {
		enabled: boolean;
		port: number;
		hostname: string;
	};
	game: {
		hand_size: number;
		code_length: number;
		cards: {
			type: `csv` | `sheets`;
			key?: string;
			questions: string;
			objects: string;
		};
	};
}