<template>
	<div id="GameLobby" class="maximize view">
		<h1 class="centre">Ghost Writer Online</h1>
		<div class="flex-row">
			<button
				class="clickable"
				@click.stop=""
			>
				Click to Copy Game Link
			</button>
		</div>
		<div class="flex-row">
			<role-select
				:team_name="$store.state.team_1.name"
				:player_name="playerName"
			/>
			<div>Player List</div>
			<role-select
				:team_name="$store.state.team_2.name"
				:player_name="playerName"
			/>
		</div>
		<div class="flex-row">
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

export default {
	name: `GameLobby`,
	components: {
		"RoleSelect": TeamRoleSelect,
	},
	computed: {
		playerName() {
			return this.$store.state.name;
		}
	},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameLobby {
	justify-content: center;
	flex-direction: column;
	align-items: stretch;
	display: flex;
}

.flex-row {
	justify-content: center;
	align-items: center;
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