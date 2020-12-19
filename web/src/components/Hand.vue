<template>
	<div id="PlayerHand">
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
</template>

<script>
export default {
	name: `PlayerHand`,
	components: {},
	data() {return {
		questions: [],
	}},
	computed: {
		userRole() {
			return this.$store.state.role;
		},
		isGuesser() {
			return this.userRole == this.$store.state.guesser_name;
		},
		isWriter() {
			return this.userRole == this.$store.state.writer_name;
		},
		buttonLabel() {
			if (this.isGuesser) {
				return this.$store.state.guesser_card_button
			} else if (this.isWriter) {
				return this.$store.state.writer_card_button
			} else {
				return `Unknown Role`
			}
		},
	},
	methods: {
		sendCard(cardIndex) {

			// Determine what the source of the card is for the server to take
			// appropriate action.
			let role = `unknown`;
			if (this.isGuesser)
				role = `guesser`
			else if (this.isWriter)
				role = `writer`

			// Create the data object for the server to receive
			let data = {
				text: this.questions[cardIndex - 1],
				from: role,
				team: this.$store.state.team,
			};

			this.questions.splice(cardIndex - 1, 1);

			// Discard the rest of the writer's hand
			if (this.isWriter) {
				this.questions = [];
			};

			// TODO -> send data to server
			console.debug(data);
		}
	},
	sockets: {
		NewCard(data) {
			/**
			 * Triggered when the client gets a new card for their hand, if the
			 * "from" property is set to either of the
			 *
			 * data = {
			 *     text: string,
			 *     from: "guesser" | "writer" | "deck",
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
	overflow-x: auto;
	margin: 0 auto;
	display: flex;
	padding: 0px;
	width: 95%;
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


.card-button {
	background: var(--card-button);
	font-size: medium;
}
.card-button:hover { background-color: var(--card-button-darken); }
</style>