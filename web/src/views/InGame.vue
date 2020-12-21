<template>
	<div id="GameView" class="maximize">
		<game-board v-if="isGuesser || objectChosen" />
		<object-selector v-else />
		<player-hand />
		<team-reminder />
		<discard-hand v-if="isGuesser" />
		<object-reminder v-else-if="isWriter && objectChosen" />
	</div>
</template>

<script>
import ObjectReminder from "../components/ObjectReminder";
import DiscardHand from "../components/DiscardHandButton";
import ObjectSelector from "../components/ChooseObject";
import TeamReminder from "../components/TeamReminder";
import GameBoard from "../components/GameBoard";
import PlayerHand from "../components/Hand";

export default {
	name: `InGame`,
	components: {
		"object-selector": ObjectSelector,
		"team-reminder": TeamReminder,
		"discard-hand": DiscardHand,
		"player-hand": PlayerHand,
		"game-board": GameBoard,
		"object-reminder": ObjectReminder
	},
	computed: {
		isGuesser() {
			return this.$store.state.role === this.$store.state.guesser_name;
		},
		isWriter() {
			return this.$store.state.role === this.$store.state.writer_name;
		},
		objectChosen() {
			return this.$store.state.chosen_object != null;
		},
	},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameView {
	grid-template-rows: 70% 1fr 50px;
	display: grid;
}
</style>