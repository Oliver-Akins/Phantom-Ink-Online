<template>
	<div id="PlayerHand">
		<div
			class="card clickable"
			v-for="cardIndex in questions.length"
			:key="`card_${cardIndex}`"
			@click.self="handleCardClick(cardIndex)"
		>
			{{questions[cardIndex - 1]}}
		</div>
		<ModalAnimation
			:show="showQuestionConfirm"
			:closable="false"
			@closed="showQuestionConfirm = false"
		>
			<h2 class="centre">Send Card?</h2>
			<p class="centre">
				You're about to send the below question to your {{ $store.state.writer_name.toLowerCase() }}, are you sure?
			</p>
			<p class="question-quote centre">
				"{{ questions[targetQuestion] }}"
			</p>
			<div class="button-container">
				<button
					class="confirm clickable"
					@click.stop="confirmSend()"
				>
					Send Card
				</button>
				<button
					class="cancel clickable"
					@click.stop="showQuestionConfirm = false"
				>
					Don't Send Card
				</button>
			</div>
		</ModalAnimation>
		<ModalAnimation
			:show="showDoneModal"
			:closable="false"
			@closed="showDoneModal = false"
		>
			<h2 class="centre">Finished Writing?</h2>
			<p class="centre">
				You're about to finish writing for the turn, this will send the
				card to the discard pile. You will still be able to view it from
				the past questions pile using the "Past Questions" button in the
				upper right corner of the game board.
			</p>
			<div class="button-container">
				<button
					class="confirm clickable"
					@click.stop="confirmDone()"
				>
					Done With Card
				</button>
				<button
					class="cancel clickable"
					@click.stop="showDoneModal = false"
				>
					Not Done With Card
				</button>
			</div>
		</ModalAnimation>
	</div>
</template>

<script>
import ModalAnimation from "./Modal";

export default {
	name: `PlayerHand`,
	components: {
		"ModalAnimation": ModalAnimation,
	},
	data() {return {
		targetQuestion: null,
		showQuestionConfirm: false,
		showDoneModal: false,
		questions: [
			`Where would I be most likely to find it?`,
			`What continent/region would I find the most of these?`,
			`What's a variety it comes in?`,
			`Where in my house am I most likely to find it in?`,
			`How is it made?`,
			`What would happen if I ate it?`,
			`If it were a musical instrument, what instrument would it be?`
		]
	}},
	computed: {},
	methods: {
		handleCardClick(cardIndex) {
			/**
			 * Handles the different types of clicks that can happen for the
			 * cards of the different roles.
			 */
			if (this.$store.state.role == this.$store.state.guesser_name)
				this.promptQuestionConfirm(cardIndex);
			else if (this.$store.state.role == this.$store.state.writer_name)
				this.showDoneModal = true;
			else
				console.error(`Invalid role: ${this.$store.state.role}`);
		},
		promptQuestionConfirm(cardIndex) {
			this.targetQuestion = cardIndex - 1;
			this.showQuestionConfirm = true;
		},
		confirmSend() {
			/**
			 * The guesser wants to send the question to the writer, this handles
			 * closing the modal and sends then sends the data to the server
			 */
			this.showQuestionConfirm = false;
			let data = {
				text: this.questions[this.targetQuestion],
				from: `guesser`,
				team: this.$store.state.team,
			}
			// TODO -> send data to server
		},
		confirmDone() {
			/**
			 * This sends all the cards in the player's hand to the server so
			 * that it can add them to the discard pile so they are viewable
			 * in the PastQuestions insert
			 */
			this.showDoneModal = false;
			let data = {
				questions: this.questions,
				team: this.$store.state.team,
			}
			this.questions = [];
			// TODO -> send data to the WSS
		},
	},
	sockets: {
		NewCard(data) {
			/**
			 * Triggered when the client gets a new card for their hand, if the
			 * "from" property is set to "deck" that means the deck game is
			 * replenishing the hand of the guesser after they sent a card to the
			 * writer, if it's set to "guesser", this is being received from the
			 * guesser and the spirit has to answer it.
			 *
			 * data = {
			 *     text: string,
			 *     from: "guesser" | "deck",
			 *     team: 1 | 2,
			 * }
			 */
			console.debug(`Got a new card from the ${data.from} on team ${data.team}`);
			this.questions.push(data.text);
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#PlayerHand {
	background-color: var(--background2);
	justify-content: space-evenly;
	flex-direction: row;
	border-radius: 20px;
	align-items: center;
	flex-wrap: nowrap;
	margin: 0 auto;
	display: flex;
	height: 250px;
	padding: 0px;
	width: 95%;
}

.card {
	background-color: var(--card-background);
	color: var(--card-text);
	width: calc(100% / 9);
	border-radius: 10px;
	padding: 10px;
	height: 80%;
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
	border-style: none;
	font-size: larger;
	outline: none;
	padding: 7px;
	margin: 5px;
}

.confirm {
	background-color: var(--confirm-background);
	color: var(--confirm-text);
}
.confirm:hover { background-color: var(--confirm-background-darken); }
.confirm:focus { background-color: var(--confirm-background-lighten); }

.cancel {
	background-color: var(--cancel-background);
	color: var(--cancel-text);
}
.cancel:hover { background-color: var(--cancel-background-darken); }
.cancel:focus { background-color: var(--cancel-background-lighten); }
</style>