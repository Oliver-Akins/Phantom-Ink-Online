<template>
	<div id="TeamReminder">
		<div
			class="container clickable"
			@click="modal_visible = true"
		>
			<img
				:class="`team_${teamNumber}`"
				:src="`/assets/${teamIcon}`"
				:alt="`${teamName} Team Icon`"
			>
		</div>
		<ModalAnimation
			:show="modal_visible"
			@closed="modal_visible = false"
		>
			<h1 class="centre">Players</h1>
			<div class="team-list">
				<div
					class="team centre"
					v-for="teamID in 2"
					:key="`team-${teamID}`"
				>
					<h2>{{$store.state[`team_${teamID}`].name}} Team:</h2>
					<div class="players">
						<p
							class="player"
							v-for="p in getTeamPlayers(teamID)"
							:key="p.name"
						>
							{{p.name}}
							<span v-if="p.role == 'writer'">
								<b>({{$store.state.writer_name}})</b>
							</span>
						</p>
					</div>
				</div>
			</div>
		</ModalAnimation>
	</div>
</template>

<script>
import ModalAnimation from "./Modal";

export default {
	name: `TeamReminder`,
	components: {
		ModalAnimation: ModalAnimation
	},
	data() {return {
		modal_visible: false
	}},
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
	methods: {
		getTeamPlayers(teamID) {
			return this.$store.state.players.filter(p => p.team == teamID);
		}
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#TeamReminder > .container {
	background-color: var(--team-reminder-background);
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
	left: 7px;
}

img.team_2 {
	width: calc(var(--size) / 2);
	bottom: calc(var(--size) / 8);
	left: calc(var(--size) / 8);
	position: absolute;
}


h1, h2, p {
	margin: 5px 0;
}

.team-list {
	justify-content: center;
	flex-direction: row;
	display: flex;
}

.team {
	width: 40%;
}
</style>