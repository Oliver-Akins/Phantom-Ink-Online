interface config {
	log: {
		level: `silly` | `debug` | `info` | `error` | `warn` | `fatal` | `trace`;
		datetime: boolean;
	};
	websocket: {
		port: number;
		permitted_hosts: string | string[];
	};
	datastores: {
		enabled: boolean;
		filetype: string;
		directory: string;
	};
	game: {
		hand_size: number;
		code_length: number;
		writer_name: string;
		guesser_name: string;
		guesser_limit: number;
		cards: {
			type: `csv` | `sheets`;
			key?: string;
			questions: {
				fingerprint: string;
				column: number;
			};
			objects: {
				fingerprint: string;
			};
		};
	};
}