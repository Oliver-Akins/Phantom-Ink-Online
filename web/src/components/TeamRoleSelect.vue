<template>
	<div :id="`${team_name}-role-select`">
		<h2 class="centre">{{ team_name }}</h2>
		<button
			@click.stop="joinWriterRole"
		>
			{{ writer_name }}
		</button>
		<button
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

<style>
@import "css/theme.css";
@import "css/style.css";
</style>