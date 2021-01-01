<template>
	<div id="CreateJoinGame" class="maximize view">
		<h1>Ghost Writer Online</h1>
		<button
			@click.stop="createGame()"
		>Create Game</button>
		<button
			@click.stop="joinGame()"
		>Join Game</button>
	</div>
</template>

<script>
export default {
	name: `CreateJoinGame`,
	components: {},
	data() {return {
		name: null,
		game_code: null,
	}},
	computed: {},
	methods: {
		createGame() {
			this.name = prompt(`What is your name?`);

			this.$socket.client.emit(`CreateGame`, {
				name: this.name,
			});
		},
		joinGame() {
			// Get the user's name
			this.name = prompt(`Enter a username:`);

			if (!this.name) {
				this.$emit(`error`, {
					status: 406,
					message: `Can't join a game without a name`,
					extra: `(provided a false-y name = ${this.name})`
				});
				return;
			};

			let qs = new URLSearchParams(window.location.search);

			// Get the game code
			if (qs.has(`game`)) {
				this.game_code = qs.get(`game`);
			} else {
				this.game_code = prompt(`What is the game code?`);
			};

			this.$socket.client.emit(`JoinGame`, {
				name: this.name,
				game_code: this.game_code
			});
		},
	},
	sockets: {
		GameJoined(data) {

			// Check for errors
			if (!(200 <= data.status && data.status < 300)) {
				this.$emit(`error`, data);
				return;
			};

			history.replaceState(null, ``, `?game=${data.game_code}`);

			// Save the data in the store
			this.$store.commit(`playerList`, data.players);
			this.$store.commit(`game_code`, this.game_code);
			this.$store.commit(`player`, {
				name: this.name,
				host: false,
			});
			this.$store.commit(`view`, `lobby`);
		},
		GameCreated(data) {

			if (!(200 <= data.status && data.status < 300)) {
				this.$emit(`error`, data);
				return;
			};

			history.replaceState(null, ``, `?game=${data.game_code}`);

			// Update storage
			this.$store.commit(`playerList`, data.players);
			this.$store.commit(`game_code`, data.game_code);
			this.$store.commit(`player`, {
				name: this.name,
				host: true,
			});
			this.$store.commit(`view`, `lobby`);
		},
	},
	mounted() {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#CreateJoinGame {
	display: flex;
	flex-direction: column;
	align-items: center;
}

button {
	background-color: var(--background2);
	color: var(--background2-text);
	font-family: var(--fonts);
	border-radius: 50px;
	border-style: none;
	font-size: larger;
	outline: none;
	padding: 10px;
	margin: 10px;
	width: 25%;
}
button:hover { background-color: var(--background2-darken); }
button:focus { background-color: var(--background2-lighten); }
</style>