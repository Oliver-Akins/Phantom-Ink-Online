<template>
	<div id="CreateJoinGame" class="maximize view">
		<div class="centre" id="logo-header">
			<a href="http://phantominkgame.com/" target="_blank" rel="noopener">
				<img
					src="/assets/phantom_ink_logo.png"
					alt="Phantom Ink Logo"
					height="200"
				>
			</a>
		</div>
		<div
			v-if="$store.getters.isFirefox"
		>
			<div
				id="firefox-warning"
				class="error-message"
			>
				<p class="centre">
					<strong>WARNING:</strong>
					<br>
					It appears as though you are using the Firefox web browser,
					please note that Firefox is not recommended for use with
					this site. Especially while streaming. This is to have the
					site look as good as possible.
				</p>
			</div>
		</div>
		<button
			class="clickable"
			@click.stop="createGame()"
		>Create Game</button>
		<button
			class="clickable"
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

			// Assert that the user entered a name and didn't cancel
			if (this.name) {
				this.$socket.client.emit(`CreateGame`, {
					name: this.name,
				});
			};
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

			history.replaceState(null, ``, `?game=${this.game_code}`);

			// Save the data in the store
			this.$store.commit(`playerList`, data.players);
			this.$store.commit(`gameCode`, this.game_code);
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
			this.$store.commit(`gameCode`, data.game_code);
			this.$store.commit(`player`, {
				name: this.name,
				host: true,
			});
			this.$store.commit(`view`, `lobby`);
		},
		GameRejoined(data) {
			/**
			 * data = {
			 *     status: integer,
			 *     ingame: boolean,
			 *     role: role,
			 *     team: team,
			 *     is_host: boolean,
			 *     players: Player[],
			 *     chosen_object: string,
			 *     hand: string[],
			 *     answers: {
			 *         team_1: string[],
			 *         team_2: string[],
			 *     },
			 * },
			 */
			console.log(data)
			if (data.status < 200 || 300 <= data.status) {
				this.$emit(`error`, data);
				return;
			};
			this.$store.commit(`resetState`);
			this.$store.commit(`player`, {
				name: this.name,
				host: data.is_host,
				role: data.role,
				team: data.team,
			});
			this.$store.commit(`setObject`, data.chosen_object);
			this.$store.commit(`view`, data.ingame ? `in-game` : `lobby`);
			this.$store.commit(`setAnswers`, data.answers);
			this.$store.commit(`playerList`, data.players);
			this.$store.commit(`replaceHand`, data.hand);

			history.replaceState(null, ``, `?game=${this.game_code}`);
			this.$store.commit(`gameCode`, this.game_code);
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

#logo-header {
	margin-top: 10vh;
}

button {
	background-color: var(--background2);
	color: var(--background2-text);
	border-radius: 50px;
	font-size: larger;
	padding: 10px;
	margin: 10px;
	width: 25%;
}
button:hover { background-color: var(--background2-darken); }
button:focus { background-color: var(--background2-lighten); }

.error-message {
	border-color: #F00;
	border-style: solid;
	border-radius: 5px;
	border-width: 2px;
	margin: 0 auto;
	width: 70%
}
</style>