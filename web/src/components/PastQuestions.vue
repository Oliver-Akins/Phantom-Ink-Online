<template>
	<div id="PastQuestions">
		<h2 class="centre">{{ $store.getters.teamName }} Questions</h2>
		<div class="questions-container">
			<div
				class="question"
				v-for="questionIndex in 8"
				:key="`question_${questionIndex}`"
			>
				{{ questions[questionIndex - 1] }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: `PastQuestions`,
	components: {},
	data() {return {
		intervalID: null,
		questions: [],
	}},
	computed: {},
	methods: {
		requestQuestions() {
			console.debug(`Requesting questions for team ${this.$store.state.team}`);
			this.$socket.client.emit(`GetPastQuestions`, {
				game_code: this.$store.state.game_code,
				team: this.$store.state.team
			});
		},
	},
	sockets: {
		PastQuestions(data) {
			if (data.status < 200 || 300 <= data.status) {
				this.$emit(`error`, data);
			};
			this.questions = data.questions;
		},
	},
	mounted() {
		this.requestQuestions();
		this.intervalID = setInterval(
			this.requestQuestions,
			5000
		);
	},
	beforeDestroy() {
		if (this.intervalID != null) {
			clearInterval(this.intervalID);
			console.debug(`Cleared interval with ID: ${this.intervalID}`);
		};
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#PastQuestions  {
	background-color: var(--board-background-alt);
	color: var(--board-background-alt-text);
	height: calc(100% - 10px);
	flex-direction: column;
	padding-bottom: 10px;
	position: absolute;
	display: flex;
	z-index: 3;
	width: 50%;
	left: 0;
	top: 0;
}

.questions-container {
	flex-grow: 1;
	justify-content: space-evenly;
	flex-direction: row;
	flex-wrap: wrap;
	display: flex;
}

.question {
	background-color: var(--board-background);
	color: var(--board-background-text);
	padding: 10px 10px 0 10px;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	display: flex;
	margin: 5px;
	width: 40%;
}
</style>