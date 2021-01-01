<template>
	<div :id="`${teamName}-role-select`" class="team-select">
		<h2 class="centre">{{ teamName }} Team</h2>
		<button
			class="clickable"
			@click.stop="joinRole(`writer`)"
		>
			{{ $store.state.writer_name }}
		</button>
		<button
			class="clickable"
			@click.stop="joinRole(`guesser`)"
		>
			{{ $store.state.guesser_name }}
		</button>
	</div>
</template>

<script>
export default {
	name: `TeamRoleSelection`,
	components: {},
	props: {
		teamID: {
			type: Number,
			required: true,
		},
	},
	computed: {
		teamName() {
			return this.$store.state[`team_${this.teamID}`].name;
		}
	},
	methods: {
		joinRole(role) {

			if (this.teamID == this.$store.state.team && this.$store.state.role == role) {
				this.$emit(`error`, {
					status: 403,
					message: `You are already that role on that team.`,
				});
				return;
			};

			let response = {
				action: `modify`,
				game_code: this.$store.state.game_code,
				name: this.$store.state.name,
				to: {
					team: this.teamID,
					role: role,
				},
			}

			if (this.$store.state.team != null) {
				response.from = {
					team: this.$store.state.team,
					role: this.$store.state.role,
				};
			};

			this.$socket.client.emit(`UpdatePlayer`, response);
		},
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