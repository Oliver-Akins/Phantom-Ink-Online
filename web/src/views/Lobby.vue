<template>
	<div id="GameLobby" class="maximize view">
		<h1 class="centre">Ghost Writer Online</h1>
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
		<div class="flex-row">
			<button
				@click.stop="exitGame()"
			>
				{{ $store.state.is_host ? `Delete` : `Leave`}} Game
			</button>
			<button
				class="clickable"
				@click.stop=""
			>
				Click to Start the Game
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
			return `${window.location.protocol}//${window.location.host}/?game=${this.$store.state.game_code}`;
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
					game_code: this.$store.state.game_code
				});
			}

			// Just a normal user, they can leave the game just fine
			else {
				this.$socket.client.emit(`LeaveGame`, {
					game_code: this.$store.state.game_code
				});
			};
		},
	},
	sockets: {
		GameLeft(data) {
			if (data.status < 200 || 300 <= data.status) {
				return this.$emit(`error`, data);
			};
			this.$store.commit(`resetState`);
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

.flex-row {
	justify-content: center;
	align-items: stretch;
	display: flex;
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
	width: 30%;
}
button:hover { background-color: var(--background2-darken); }
button:focus { background-color: var(--background2-lighten); }
</style>