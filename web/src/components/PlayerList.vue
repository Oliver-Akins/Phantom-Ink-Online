<template>
	<div id="player_list" class="centre">
		<h2>Players:</h2>
		<div
			v-for="player in players"
			:key="player.name"
		>
			{{ player.name }}
		</div>
	</div>
</template>

<script>
export default {
	name: `PlayerList`,
	components: {},
	computed: {
		isHost() {
			return this.$store.state.is_host;
		},
		players() {
			return this.$store.state.players.filter(
				p => p.role == null && p.team == null
			);
		},
		gameCode() {
			return this.$store.state.game_code;
		},
	},
	methods: {
		teamName(teamID) {
			return this.$store.state[`team_${teamID}`].name;
		},
		roleName(role) {
			return this.$store.state[`${role}_name`]
		},
	},
	sockets: {
		PlayerUpdate(data) {
			/**
			 * data = {
			 *     status: integer,
			 *     mode: "modify" | "new" | "remove",
			 *     name: string,
			 *     team: integer,
			 *     role: string
			 * }
			 */
			if (!(200 <= data.status && data.status < 300)) {
				this.$emit(`error`, data);
				return;
			};

			switch (data.action) {
				case "modify":
					if (this.$store.state.name === data.name) {
						this.$store.commit(`player`, {
							role: data.role,
							team: data.team,
						});
					};
					this.$store.commit(`updatePlayer`, data)
					break;
				case "new":
				case "remove":
					this.$store.commit(`playerList`, data.players);
					break;
				default:
					console.warn(`Unknown response type from "PlayerUpdate": ${data.mode}`);
			};
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#player_list {
	background-color: var(--background2);
	color: var(--background2-text);
	padding: 0 15px 15px;
	border-radius: 20px;
	margin: 5px 10px;
	width: 15%;
}
</style>