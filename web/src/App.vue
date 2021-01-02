<template>
	<div id="app" class="maximize">
		<div v-if="!isMobile" class="maximize">
			<transition name="top-slide">
				<div
					v-if="error"
					class="error-bar"
				>
					{{ error }}
				</div>
			</transition>
			<CreateJoin
				v-if="gameState == `login`"
				@error="handleError($event)"
			/>
			<GameLobby
				v-else-if="gameState == `lobby`"
				@error="handleError($event)"
			/>
			<InGame
				v-else-if="gameState == `in-game`"
				@error="handleError($event)"
			/>
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
				please contact "oliver {at} akins.me" with the following information:
				<br><br>
				{{ userAgent }}
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
	data() {return {
		error: null
	}},
	computed: {
		gameState() {
			return this.$store.state.view;
		},
		userAgent() {
			if (navigator == null) {
				return "Navigator Undefined";
			};
			return navigator.userAgent;
		},
		isMobile () {
			return this.userAgent.match(/(Navigator Undefined)|iPhone|iPod|Android/) != null;
		},
	},
	methods: {
		handleError(data) {
			this.error = `${data.status}${data.source ? ` @ ${data.source}` : ''} : ${data.message}`;
			console.error(`${this.error}${data.extra ? ` ${data.extra}` : ''}`);
			setTimeout(() => { this.error = null; }, 3000);
		},
	},
}
</script>

<style>
@import "css/theme.css";
@import "css/style.css";

html, body {
	background-color: var(--background1);
	color: var(--light-font-colour);
	font-family: var(--fonts);
	overflow-x: hidden;
	height: 100vh;
	width: 100vw;
	padding: 0;
	margin: 0;
}

.error-bar {
	background-color: #bb0000;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	position: fixed;
	display: flex;
	height: 35px;
	width: 100vw;
	left: 0;
	top: 0;
}

.error {
	border: solid 2px red;
	margin: 50% auto;
	width: 90%;
}
</style>