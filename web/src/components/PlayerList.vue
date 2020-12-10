<template>
	<div id="player_list" class="centre">
		<h2>Players:</h2>
		<div
			v-for="player in players"
			:key="player.name"
		>
			{{ player.name }}
			<span v-if="player.role" class="player-role">
				( {{ player.role }} )
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: `PlayerList`,
	components: {},
	computed: {
		isHost() {
			return false;
		},
		players() {
			return [
				{
					name: `Oliver`,
					role: `Developer`
				},
				{
					name: `Max`,
					role: `Designer`
				},
				{
					name: `Ray`,
				}
			]
			//return this.$store.state.players;
		}
	},
	methods: {},
	sockets: {
		NewPlayer() {},
		PlayerUpdate() {},
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