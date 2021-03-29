<template>
	<div id="GameLobby" class="maximize view">
		<div class="centre" id="logo-header">
			<a href="http://playghostwriter.com" target="_blank" rel="noopener">
				<img
					src="/assets/ghost_writer_logo.png"
					alt="Ghost Writer Logo"
					height="150px"
				>
			</a>
		</div>
		<div class="flex-row">
			<button
				class="clickable"
				v-clipboard:copy="gameURL"
				v-clipboard:success="copySuccess"
				v-clipboard:error="copyError"
			>
				{{ copyURLButtonText }}
			</button>
		</div>
		<div class="flex-row">
			<role-select
				:teamID="1"
				@error="$emit(`error`, $event)"
			/>
			<player-list @error="$emit(`error`, $event)" />
			<role-select
				:teamID="2"
				@error="$emit(`error`, $event)"
			/>
		</div>
		<div
			class="flex-row"
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
		<div class="flex-row">
			<button
				class="clickable"
				@click.stop="randomizeTeams()"
			>
				Randomize Teams
			</button>
			<button
				class="clickable"
				@click.stop="startGame()"
			>
				Click to Start the Game
			</button>
			<div class="new-line"></div>
			<button
				class="clickable"
				@click.stop="exitGame()"
			>
				{{ $store.state.is_host ? `Delete` : `Leave`}} Game
			</button>
		</div>
	</div>
</template>

<script>
import TeamRoleSelect from "../components/TeamRoleSelect";
import PlayerList from "../components/PlayerList";

export default {
	name: `GameLobby`,
	components: {
		"RoleSelect": TeamRoleSelect,
		"PlayerList": PlayerList,
	},
	data() {return {
		copyURLButtonText: `Click to Copy Game Link`,
	}},
	computed: {
		playerName() {
			return this.$store.state.name;
		},
		gameURL() {
			return `${window.location.protocol}//${window.location.host}/?game=${this.gameCode}`;
		},
		gameCode() {
			return this.$store.state.game_code;
		},
		canRandomize() {
			return this.$store.state.is_host;
		},
	},
	methods: {
		copySuccess() {
			this.copyURLButtonText = `Game Link Copied!`;
			setTimeout(() => { this.copyURLButtonText = `Click to Copy Game Link`; }, 1000)
		},
		copyError() {
			this.$emit(`error`, {
				status: 418,
				message: `Failed to copy game URL`,
			});
		},
		exitGame() {
			// The user is the host, they can't leave the game, so kick
			// everyone from the game.
			if (this.$store.state.is_host) {
				this.$socket.client.emit(`DeleteGame`, {
					game_code: this.gameCode
				});
			}

			// Just a normal user, they can leave the game just fine
			else {
				this.$socket.client.emit(`LeaveGame`, {
					game_code: this.gameCode
				});
			};
		},
		startGame() {
			this.$socket.client.emit(`StartGame`, {
				game_code: this.gameCode
			});
		},
		randomizeTeams() {
			this.$socket.client.emit(`RandomizeTeams`, {
				game_code: this.gameCode
			});
		},
	},
	sockets: {
		GameLeft(data) {
			if (data.status < 200 || 300 <= data.status) {
				return this.$emit(`error`, data);
			};
			this.$store.commit(`resetState`);
		},
		GameStarted(data) {
			if (data.status < 200 || 300 <= data.status) {
				return this.$emit(`error`, data);
			};
			this.$store.commit(`view`, `in-game`);
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameLobby {
	flex-direction: column;
	align-items: stretch;
	display: flex;
}

#logo-header {
	margin-top: 5vh;
}

.flex-row {
	justify-content: center;
	align-items: stretch;
	display: flex;
	flex-wrap: wrap;
}

button {
	background-color: var(--background2);
	color: var(--background2-text);
	border-radius: 50px;
	font-size: larger;
	padding: 10px;
	margin: 10px;
	width: 30%;
}
button:hover { background-color: var(--background2-darken); }
button:focus { background-color: var(--background2-lighten); }


div.new-line {
	width: 100% !important;
	height: 0px;
}

.error-message {
	border-color: #F00;
	border-style: solid;
	border-radius: 5px;
	border-width: 2px;
	margin-top: 10px;
	width: 70%
}
</style>