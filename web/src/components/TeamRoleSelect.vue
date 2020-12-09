<template>
	<div :id="`${team_name}-role-select`" class="team-select">
		<h2 class="centre">{{ team_name }} Team</h2>
		<button
			class="clickable"
			@click.stop="joinWriterRole"
		>
			{{ writer_name }}
		</button>
		<button
			class="clickable"
			@click.stop="joinGuesserRole"
		>
			{{ guesser_name }}
		</button>
	</div>
</template>

<script>
export default {
	name: `TeamRoleSelection`,
	components: {},
	props: {
		team_name: {
			type: String,
			required: true,
		},
		player_name: {
			type: String,
			required: true,
		},
	},
	data() {return {
		writer_name: `Spirit`,
		guesser_name: `Medium`,
	}},
	computed: {},
	methods: {
		joinWriterRole() {},
		joinGuesserRole() {},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

.team-select {
	background-color: var(--background2);
	color: var(--background2-text);
	flex-direction: column;
	border-radius: 20px;
	align-items: center;
	padding: 0 0 10px 0;
	display: flex;
	margin: 5px;
	width: 25%;
}

button {
	background-color: var(--background3);
	color: var(--background3-text);
	font-family: var(--fonts);
	border-radius: 50px;
	border-style: none;
	font-size: larger;
	outline: none;
	padding: 10px;
	margin: 10px;
	width: 85%;
}
button:hover { background-color: var(--background3-darken); }
button:focus { background-color: var(--background3-lighten); }
</style>