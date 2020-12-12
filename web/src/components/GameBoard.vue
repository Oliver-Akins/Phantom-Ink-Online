<template>
	<div id="GameBoard">
		<div id="other-team-answers" class="team-container">
			<h2 class="centre">{{ $store.getters.otherTeamName }} Answers</h2>
			<div class="answer-container">
				<div
					class="answer"
					v-for="answerIndex in 8"
					:key="`${otherTeamID}-answer-container-${answerIndex}`"
				>
					<input
						type="text"
						class="other-team-answer"
						:id="`${otherTeamID}-answer-${answerIndex}`"
						v-model="answers[`team_${3 - $store.state.team}`][answerIndex-1]"
						disabled
					>
					<span
						class="other-team eye-container"
						v-if="$store.state[`team_${3 - $store.state.team}`].eyes[answerIndex] > 0"
					>
						<span
							v-if="$store.state[`team_${3 - $store.state.team}`].eyes[answerIndex] > 1"
							class="eye-multiplier"
						>
							{{ $store.state[`team_${3 - $store.state.team}`].eyes[answerIndex] }} x
						</span>
						<img
							class="eye"
							:src="`/assets/${$store.state.eye_icon}`"
							alt="reveal another letter"
						>
					</span>
				</div>
			</div>
		</div>
		<div id="team-answers" class="team-container">
			<h2 class="centre">{{ $store.getters.teamName }} Answers</h2>
			<div class="answer-container">
				<div
					class="answer"
					v-for="answerIndex in 8"
					:key="`${teamID}-answer-container-${answerIndex}`"
				>
					<input
						type="text"
						class="team-answer"
						:id="`${teamID}-answer-${answerIndex}`"
						:disabled="$store.state.role == $store.state.guesser_name"
						@input.stop="answerInputHandler(answerIndex)"
						v-model="answers[`team_${$store.state.team}`][answerIndex-1]"
					>
					<span
						class="team eye-container"
						v-if="$store.state[`team_${$store.state.team}`].eyes[answerIndex] > 0"
					>
						<img
							class="eye"
							:src="`/assets/${$store.state.eye_icon}`"
							alt="reveal another letter"
						>
						<span
							v-if="$store.state[`team_${$store.state.team}`].eyes[answerIndex] > 1"
							class="eye-multiplier"
						>
							x {{ $store.state[`team_${$store.state.team}`].eyes[answerIndex] }}
						</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: `GameBoard`,
	components: {},
	data() {return {
		answers: {
			team_1: [ ``, ``, ``, ``, ``, ``, ``, `` ],
			team_2: [ ``, ``, ``, ``, ``, ``, ``, `` ],
		},
	}},
	computed: {
		teamID() {
			return this.$store.getters.teamName.replace(/\s/g, `-`).toLowerCase();
		},
		otherTeamID() {
			return this.$store.getters.otherTeamName.replace(/\s/g, `-`).toLowerCase();
		},
	},
	methods: {
		answerInputHandler(answerIndex) {
			console.debug(this.answers[`team_${this.$store.state.team}`][answerIndex-1]);

			let team = this.$store.state.team;
			let data = {
				team: team,
				answer: answerIndex,
				value: this.answers[`team_${team}`][answerIndex - 1]
			};
			// Send data to socket.io server
		}
	},
	sockets: {
		UpdateAnswer(data) {
			/*
			{
				team: 1 | 2,
				answer: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
				value: String,
			}
			*/
			this.answers[`team_${data.team}`][data.answer - 1] = data.value;
		}
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameBoard {
	background-color: var(--board-background);
	color: var(--board-background-text);
	justify-content: space-evenly;
	padding: 0 10px 10px;
	border-radius: 20px;
	flex-direction: row;
	margin: 15px auto;
	display: flex;
	width: 95%;
}

.team-container {
	display: inline-block;
	width: 45%;
}

.answer-container {
	flex-direction: column;
	justify-content: stretch;
	align-items: center;
	display: flex;
}

.answer {
	position: relative;
	width: 100%;
}

.eye-container {
	position: absolute;
	width: 70px;
	z-index: 1;
}
.team {
	right: -40px;
	top: 25%;
}
.other-team {
	text-align: right;
	left: -50px;
	top: 25%;
}

.eye {
	height: 25px;
	vertical-align: bottom;
}

.eye-multiplier {
	display: inline-block;
}

input[type="text"] {
	font-family: var(--fonts);
	background-color: var(--board-background-alt);
	color: var(--board-background-alt-text);
	border-radius: 7px;
	font-size: larger;
	padding: 12px;
	outline: none;
	margin: 7px 0;
	border: none;
	width: 90%;
}
input[type="text"].team-answer {
	padding-right: 5%;
}
input[type="text"].other-team-answer {
	padding-left: 5%;
}
</style>