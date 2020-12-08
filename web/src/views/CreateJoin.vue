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
	computed: {},
	methods: {
		createGame() {
			let name = prompt(`What is your name?`);
			console.log(`Creating a new game for ${name}`);
		},
		joinGame() {
			// Get the user's name
			let name = prompt(`What is your name?`);

			let qs = new URLSearchParams(window.location.search);

			// Get the game code
			let game_code;
			if (qs.has(`game_code`)) {
				game_code = qs.get(`game_code`);
			} else {
				game_code = prompt(`What is the game code?`);
			}

			console.log(`${name} is joining game ${game_code}`);
		},
	},
	sockets: {
		GameJoined(data) {},
		GameCreated(data) {},
	},
	mounted() {},
}
</script>

<style>
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