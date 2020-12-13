<template>
	<div id="GameView" class="maximize">
		<game-board />
		<player-hand />
		<team-reminder />
		<discard-hand />
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
	computed: {},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";
</style>