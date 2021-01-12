<template>
	<div id="PlayerHand">
		<div class="flex-center" v-if="mostRecentQuestion">
			{{ mostRecentQuestion }}
		</div>
		<div class="flex-center" v-else-if="gameOver">
			<a
				v-if="$store.state.survey_link"
				:href="$store.state.survey_link"
				target="_blank"
				rel="noopener"
			>
				<button class="clickable">
					Complete The Survey
				</button>
			</a>
			<button
				class="clickable"
				@click.stop="endGame"
			>
				Go to Lobby
			</button>
		</div>
		<div class="hand" v-else>
			<div
				class="card"
				v-for="cardIndex in questions.length"
				:key="`card_${cardIndex}`"
				@click.self="handleCardClick(cardIndex)"
			>
				<p class="card-text centre">
					{{ questions[cardIndex - 1] }}
				</p>
				<button
					class="card-button clickable"
					@click.stop="sendCard(cardIndex)"
				>
					{{ buttonLabel }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: `PlayerHand`,
	components: {},
	data() {return {
		mostRecentQuestion: null,
	}},
	computed: {
		userRole() {
			return this.$store.state.role;
		},
		isGuesser() {
			return this.userRole === `guesser`;
		},
		isWriter() {
			return this.userRole === `writer`;
		},
		buttonLabel() {
			if (this.isGuesser) {
				return this.$store.state.guesser_card_button;
			} else if (this.isWriter) {
				return this.$store.state.writer_card_button;
			} else {
				return `Unknown Role`;
			}
		},
		questions() {
			return this.$store.state.questions;
		},
		gameOver() {
			if (this.$store.state.chosen_object) {
				let answerRegex = new RegExp(`${this.$store.state.chosen_object.toLowerCase()}\\.?`);

				for (var team in this.$store.state.answers) {
					for (var answer of this.$store.state.answers[team]) {
						if (answer.toLowerCase().match(answerRegex)) {
							return true;
						};
					};
				};
			};
			return false;
		},
	},
	methods: {
		sendCard(cardIndex) {

			// Create the data object for the server to receive
			let data = {
				game_code: this.$store.state.game_code,
				text: this.questions[cardIndex - 1],
				from: this.userRole,
				team: this.$store.state.team,
			};

			this.questions.splice(cardIndex - 1, 1);

			// Discard the rest of the writer's hand
			if (this.isWriter) {
				this.mostRecentQuestion = data.text;
				this.$store.commit(`replaceHand`, []);
			};

			this.$socket.client.emit(`SendCard`, data);
		},
		endGame() {
			this.$socket.client.emit(`ResetGame`, {
				game_code: this.$store.state.game_code
			});
		},
	},
	mounted() {
		if (this.isGuesser) {
			console.debug(`Getting hand from server`);
			this.$socket.client.emit(`GetHand`, {
				game_code: this.$store.state.game_code,
				team: this.$store.state.team
			});
		};
	},
	sockets: {
		UpdateHand(data) {
			/**
			 * Triggered when the client gets a new card for their hand, if the
			 * "from" property is set to either of the
			 *
			 * data = {
			 *     questions: String[],
			 *     mode: "append"|"replace",
			 * }
			 */
			console.debug(`Updating hand.`);
			switch (data.mode) {
				case `append`:
					if (this.isWriter && this.mostRecentQuestion) {
						this.mostRecentQuestion = null;
					};
					this.$store.commit(`appendToHand`, data.questions);
					break;
				case `replace`:
					this.$store.commit(`replaceHand`, data.questions);
					break;
				default:
					console.error(`Server returned an unsupported mode: ${data.mode}`);
			};
		},
		GameReset(data) {
			if (data.status < 200 || 300 <= data.status) {
				return this.$emit(`error`, data);
			};
			this.$store.commit(`setAnswers`, {
				team_1: new Array(8).fill(``),
				team_2: new Array(8).fill(``),
			});
			this.$store.commit(`replaceHand`, []);
			this.$store.commit(`setObject`, null);
			this.$store.commit(`view`, `lobby`);
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#PlayerHand {
	background-color: var(--background2);
	border-radius: 20px;
	margin: 0 auto;
	padding: 0px;
	width: 95%;
}

.flex-center {
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100%;
	width: 100%;
}

.hand {
	justify-content: space-evenly;
	flex-direction: row;
	align-items: center;
	flex-wrap: nowrap;
	overflow-x: auto;
	display: flex;
	height: 100%;
	width: 100%;
}

.card {
	background-color: var(--card-background);
	color: var(--card-text);
	flex-direction: column;
	width: calc(100% / 9);
	border-radius: 10px;
	padding: 10px;
	display: flex;
	height: 80%;
}

.card-text {
	flex-grow: 1;
}

.question-quote {
	font-size: large;
}

.button-container {
	justify-content: space-evenly;
	display: flex;
}

button {
	border-radius: 7px;
	font-size: larger;
	padding: 7px;
	margin: 5px;
}

.card-button {
	background: var(--card-button);
	font-size: medium;
}
.card-button:hover { background-color: var(--card-button-darken); }
</style>