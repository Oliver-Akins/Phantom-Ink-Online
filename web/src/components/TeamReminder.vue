<template>
	<div id="TeamReminder">
		<img
			:class="`team_${teamNumber}`"
			:src="`/assets/${teamIcon}`"
			:alt="`${teamName} Team Icon`"
		>
	</div>
</template>

<script>
export default {
	name: `TeamReminder`,
	components: {},
	computed: {
		teamNumber() {
			return this.$store.state.team;
		},
		teamName() {
			return this.$store.state[`team_${this.teamNumber}`].name;
		},
		teamIcon() {
			return this.$store.state[`team_${this.teamNumber}`].icon;
		},
	},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#TeamReminder {
	background-color: var(--background3);
	border-radius: 0 100% 0 0;
	height: var(--size);
	width: var(--size);
	position: fixed;
	--size: 120px;
	bottom: 0;
	left: 0;
}

img.team_1 {
	width: calc(var(--size) / 1.5);
	position: absolute;
	bottom: 7px;
	left: 7px;;
}

img.team_2 {
	width: calc(var(--size) / 2);
	bottom: calc(var(--size) / 8);
	left: calc(var(--size) / 8);
	position: absolute;
}
</style>