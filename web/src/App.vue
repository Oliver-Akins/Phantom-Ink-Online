<template>
	<div id="app" class="maximize">
		<div v-if="!isMobile" class="maximize">
			<CreateJoin v-if="gameState == `login`" />
			<GameLobby v-else-if="gameState == `lobby`" />
			<InGame v-else-if="gameState == `in-game`" />
			<Attributions />
		</div>
		<div
			v-else
			class="error"
		>
			<h1 class="centre">Ghost Writer Online</h1>
			<p class="centre">
				To use this site you must be using a laptop, desktop, or iPad.
				If you are on one of those devices and you still see this message,
				
			</p>
		</div>
	</div>
</template>

<script>
import AttributionsBar from "./components/Attributions";
import CreateJoinGame from "./views/CreateJoin";
import GameLobby from "./views/Lobby";
import InGame from "./views/InGame";

export default {
	name: `App`,
	components: {
		"Attributions": AttributionsBar,
		"CreateJoin": CreateJoinGame,
		"GameLobby": GameLobby,
		"InGame": InGame,
	},
	computed: {
		gameState() {
			return this.$store.state.view;
		},
		isMobile () {
			return navigator == null || navigator.userAgent.match(/iPhone|iPod|Android/) != null;
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

.error {
	border: solid 2px red;
	margin: 50% auto;
	width: 90%;
}
</style>