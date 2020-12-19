<template>
	<div id="GameView" class="maximize">
		<game-board />
		<player-hand />
		<team-reminder />
		<discard-hand
			v-if="isGuesser"
		/>
	</div>
</template>

<script>
import DiscardHand from "../components/DiscardHandButton";
import TeamReminder from "../components/TeamReminder";
import GameBoard from "../components/GameBoard";
import PlayerHand from "../components/Hand";

export default {
	name: `InGame`,
	components: {
		"team-reminder": TeamReminder,
		"discard-hand": DiscardHand,
		"player-hand": PlayerHand,
		"game-board": GameBoard,
	},
	computed: {
		isGuesser() {
			return this.$store.state.role === this.$store.state.guesser_name;
		},
	},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameView {
	display: grid;
	grid-template-rows: 70% 1fr 40px;
}
</style>