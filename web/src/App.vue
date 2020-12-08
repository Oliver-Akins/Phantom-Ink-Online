<template>
	<div id="app" class="maximize">
		<CreateJoin v-if="gameState == `login`" />
		<GameLobby v-else-if="gameState == `lobby`" />
		<Attributions />
	</div>
</template>

<script>
import AttributionsBar from "./components/Attributions";
import CreateJoinGame from "./views/CreateJoin";
import GameLobby from "./views/Lobby";

export default {
	name: `App`,
	components: {
		"Attributions": AttributionsBar,
		"CreateJoin": CreateJoinGame,
		"GameLobby": GameLobby,
	},
	computed: {
		gameState() {
			return this.$store.state.view;
		},
	},
	methods: {},
}
</script>

<style>
@import "css/theme.css";
@import "css/style.css";

html, body {
	background-color: var(--background1);
	color: var(--light-font-colour);
	font-family: var(--fonts);
	overflow: hidden;
	height: 100vh;
	width: 100vw;
	padding: 0;
	margin: 0;
}
</style>