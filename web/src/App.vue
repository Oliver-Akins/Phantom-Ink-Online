<template>
	<div id="app" class="maximize">
		<div v-if="!isMobile" class="maximize">
			<transition name="top-slide">
				<div
					v-if="alert.message"
					class="alert-bar"
					:class="alert.type"
				>
					{{ alert.message }}
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
			class="device-error"
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
		alert: {
			message: null,
			type: null,
		},
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
			this.alert = {
				message: `${data.status}${data.source ? ` @ ${data.source}` : ''} : ${data.message}`,
				type: `error`,
			};
			console.error(`${this.alert.message}${data.extra ? ` ${data.extra}` : ''}`);
			setTimeout(() => {
				this.alert = {
					message: null,
					type: null,
				};
			}, 3000);
		},
	},
	sockets: {
		GameDeleted(data) {
			if (data.status < 200 || 300 <= data.status) {
				this.handleError(data);
			} else {
				this.alert = {
					message: `The game has been ended by the host.`,
					type: `info`,
				};
				this.$store.commit(`resetState`);
				setTimeout(() => {
					this.alert = {
						message: null,
						type: null,
					};
				}, 2000)
			};
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

.alert-bar {
	justify-content: center;
	align-items: center;
	position: fixed;
	display: flex;
	height: 35px;
	width: 100vw;
	left: 0;
	top: 0;
}

.alert-bar.error {
	background-color: #bb0000;
	color: #FFFFFF;
}
.alert-bar.info {
	background-color: #7289da;
	color: #000000;
}

.device-error {
	border: solid 2px red;
	margin: 50% auto;
	width: 90%;
}
</style>