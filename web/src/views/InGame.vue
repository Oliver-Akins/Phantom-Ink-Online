<template>
	<div id="GameView" class="maximize">
		<game-board
			v-if="isGuesser || objectChosen"
			@error="$emit(`error`, $event)"
		/>
		<object-selector
			v-else
			@error="$emit(`error`, $event)"
		/>
		<player-hand @error="$emit(`error`, $event)" />
		<team-reminder @error="$emit(`error`, $event)" />
		<discard-hand
			v-if="isGuesser"
			@error="$emit(`error`, $event)"
		/>
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
			return this.$store.state.role === `guesser`;
		},
		isWriter() {
			return this.$store.state.role === `writer`;
		},
		objectChosen() {
			return this.$store.state.chosen_object != null;
		},
	},
	methods: {},
	sockets: {
		ChosenObject(data) {
			/**
			 * Sent to all clients so that they can set their store data and in
			 * turn stay synchronized on what object they are trying to get
			 * their teammate to guess.
			 */
			if (data.status < 200 || 300 <= data.status) {
				this.$emit(`error`, data);
			};
			this.$store.commit(`setObject`, data.choice);
		},
	}
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#GameView {
	background: var(--game-view-background);
	grid-template-rows: 70% 1fr 50px;
	display: grid;
}
</style>