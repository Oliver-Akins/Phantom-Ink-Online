<template>
	<div id="GameView" class="maximize">
		<div class="game-board-container">
			<past-questions />
			<game-board />
		</div>
		<player-hand />
		<team-reminder />
		<discard-hand />
	</div>
</template>

<script>
import DiscardHand from "../components/DiscardHandButton";
import PastQuestions from '../components/PastQuestions';
import TeamReminder from "../components/TeamReminder";
import GameBoard from "../components/GameBoard";
import PlayerHand from "../components/Hand";

export default {
	name: `InGame`,
	components: {
		"past-questions": PastQuestions,
		"team-reminder": TeamReminder,
		"discard-hand": DiscardHand,
		"player-hand": PlayerHand,
		"game-board": GameBoard,
	},
	computed: {},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

.game-board-container {
	text-align: center;
	position: relative;
	margin: 15px auto;
	width: 95%;
}
</style>