<template>
	<div id="PastQuestions">
		<h2 class="centre">{{ $store.getters.teamName }} Questions</h2>
		<div class="questions-container">
			<div
				class="question"
				v-for="questionIndex in 8"
				:key="`question_${questionIndex}`"
			>
				Question #{{ questionIndex }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: `PastQuestions`,
	components: {},
	computed: {},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#PastQuestions  {
	background-color: var(--board-background-alt);
	color: var(--board-background-alt-text);
	border-radius: 20px 0 0 20px;
	height: calc(100% - 10px);
	flex-direction: column;
	padding-bottom: 10px;
	position: absolute;
	display: flex;
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
	margin: 5px;
	width: 40%;
}
</style>