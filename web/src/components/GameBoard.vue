<template>
	<div
		id="GameBoard"
		:class="teamClass"
	>
		<div id="other-team-answers" class="team-container">
			<div class="answer-container maximize">
				<!--
					Repeats to create the number of team answers that we need,
					these text inputs are always disabled for the player as these
					inputs are only ever for the opposing team. They still have
					a model attribute to keep them synced correctly.
				-->
				<div
					v-for="answerIndex in 8"
					:class="[
						`answer`,
						answers[`team_${3 - $store.state.team}`][answerIndex-1].toLowerCase().match(getObject)
							? `correct`: ``
					]"
					:key="`${otherTeamID}-answer-container-${answerIndex}`"
				>
					<input
						type="text"
						class="other-team-answer"
						:id="`${otherTeamID}-answer-${answerIndex}`"
						v-model="answers[`team_${3 - $store.state.team}`][answerIndex-1]"
						disabled
					>

					<!-- Display the number of eyes for the slot on the board -->
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
			<div class="answer-container maximize">
				<!--
					This repeats to create the volume oftext inputs that we need,
					only allowing the text inputs to be used by the spirit players
					and having them be disabled for all other players
				-->
				<div
					v-for="answerIndex in 8"
					:class="[
						`answer`,
						answers[`team_${$store.state.team}`][answerIndex-1].toLowerCase().match(getObject)
							? `correct`: ``
					]"
					:key="`${teamID}-answer-container-${answerIndex}`"
				>
					<input
						type="text"
						class="team-answer"
						:id="`${teamID}-answer-${answerIndex}`"
						@input.stop="answerInputHandler(answerIndex)"
						v-model="answers[`team_${$store.state.team}`][answerIndex-1]"
					>

					<!-- Display the number of eyes for the slot on the board -->
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
		<button
			id="past-questions-toggle"
			class="clickable"
			@click.self="visible = !visible"
		>
			{{ visible ? `Hide` : `Show` }} Past Questions
		</button>
		<a
			href="http://phantominkgame.com/"
			target="_blank"
			id="game-logo-link"
		>
			<img
				id="game-logo"
				src="/assets/phantom_ink_logo.png"
				alt="Phantom Ink Logo"
				rel="noopener"
			>
		</a>
		<transition name="expand-from-left">
			<past-questions v-if="visible" @error="$emit(`error`, $event)" />
		</transition>
	</div>
</template>

<script>
import PastQuestions from './PastQuestions';

export default {
	name: `GameBoard`,
	components: {
		"past-questions": PastQuestions,
	},
	data() {return {
		visible: false,
	}},
	computed: {
		teamID() {
			return this.$store.getters.teamName.replace(/\s/g, `-`).toLowerCase();
		},
		otherTeamID() {
			return this.$store.getters.otherTeamName.replace(/\s/g, `-`).toLowerCase();
		},
		answers() {
			return this.$store.state.answers;
		},
		getObject() {
			if (!this.$store.state.chosen_object) {
				return /\n/;
			};
			return new RegExp(`${this.$store.state.chosen_object.toLowerCase()}\\.?`);
		},
		teamClass() {
			if (this.teamID == `sun`) {
				return `sun`;
			} else if (this.teamID == `moon`) {
				return `moon`;
			};
			return ``;
		},
	},
	methods: {
		isCorrect(team, answerIndex) {
			let typedAnswer = this.answers[`team_${team}`][answerIndex - 1].toLowerCase();
			if (this.$store.state.chosen_object == typedAnswer) {
				return `correct`;
			};
			return ``;
		},
		answerInputHandler(answerIndex) {
			/**
			 * Sends input data updates to the server when they occur, indicating
			 * the data as necessary
			 */
			let team = this.$store.state.team;
			let data = {
				game_code: this.$store.state.game_code,
				team: team,
				answer: answerIndex,
				value: this.answers[`team_${team}`][answerIndex - 1]
			};

			this.$socket.client.emit(`UpdateAnswer`, data);
		},
	},
	sockets: {
		UpdateAnswer(data) {
			/**
			 * Receives the updates for the answer for both teams, updating the
			 * data for the text inputs to be displayed dynamically.
			 *
			 * data -> {
			 *     team: 1 | 2,
			 *     answer: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
			 *     value: string
			 * }
			 */
			this.$store.commit(`updateAnswer`, data);
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameBoard {
	color: var(--board-background-text);
	justify-content: space-evenly;
	padding-bottom: 10px;
	flex-direction: row;
	position: relative;
	padding-top: 40px;
	margin: 15px auto;
	display: flex;
	width: 95%;
}

#GameBoard.sun {
	background: var(--board-background-sun), var(--board-background);
}
#GameBoard.moon {
	background: var(--board-background-moon), var(--board-background);
}

#game-logo-link {
	position: absolute;
	z-index: 1;
	top: 7px;
	height: 10%
}
#game-logo {
	height: 100%;
}

h2 {
	margin: 12px 0;
}

.team-container {
	height: 100%;
	width: 45%;
}

.answer-container {
	justify-content: space-evenly;
	flex-direction: column;
	display: flex;
}
#other-team-answers .answer-container {
	align-items: flex-end;
}

.answer {
	position: relative;
	width: 90%;
}
.answer.correct > input {
	border-color: green !important;
	border-width: 3px;
}

#other-team-answers .answer {
	margin-right: 20px;
}

.eye-container {
	position: absolute;
	height: 100%;
	z-index: 1;
}
.team {
	right: -53px;
	top: 0;
}
.other-team {
	left: -35px;
	top: 0;
}

.eye {
	height: 100%;
}

.eye-multiplier {
	display: inline-block;
}

input[type="text"] {
	background-color: var(--board-background-alt);
	color: var(--board-background-alt-text);
	font-family: var(--input-fonts);
	text-transform: uppercase;
	border-color: transparent;
	border-style: solid;
	border-width: 2px;
	font-size: larger;
	outline: none;
	padding: 7px;
	width: 100%;
	margin: 0;
}
input[type="text"]:focus {
	border-color: var(--board-background-text);
}
input[type="text"].other-team-answer {
	padding-left: 35px;
}

#past-questions-toggle {
	background-color: var(--past-questions-button-default);
	border-radius: 25px;
	position: absolute;
	padding: 10px;
	right: 110px;
	top: 15px;
}
#past-questions-toggle:hover { background-color: var(--past-questions-button-hover); }
#past-questions-toggle:focus { background-color: var(--past-questions-button-focus); }
</style>