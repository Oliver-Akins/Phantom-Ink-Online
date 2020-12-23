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
		code_length: number;
		hostname: string;
	};
	cards: {
		type: `csv` //| `sheets`;
		key?: string;
		questions: string;
		objects: string;
	}
}