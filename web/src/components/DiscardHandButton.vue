<template>
	<div id="DiscardHandButton">
		<div style="width: 100%; height: 100%;">
			<button
				class="discard-hand clickable"
				@click.stop="confirmVisible = true"
			>
				<img
					:src="`/assets/${buttonIcon}`"
					alt="Discard entire hand"
					class="icon"
				>
			</button>
		</div>
		<ModalAnimation
			:show="confirmVisible"
			:closable="false"
			@closed="confirmVisible = false"
		>
			<h2 class="centre">Discard Hand?</h2>
			<p class="centre">
				Are you sure you want to discard your team's
				<strong>entire</strong> hand?
			</p>
			<div class="buttons">
				<button
					class="confirm modal-button clickable"
					@click.stop="discardHand()"
				>
					Discard Hand
				</button>
				<button
					class="cancel modal-button clickable"
					@click.stop="confirmVisible = false"
				>
					Don't Discard Hand
				</button>
			</div>
		</ModalAnimation>
	</div>
</template>

<script>
import Modal from "./Modal";

export default {
	name: `DiscardHand`,
	components: {
		"ModalAnimation": Modal
	},
	data() {return {
		confirmVisible: false,
	}},
	computed: {
		buttonIcon() {
			return this.$store.state.discard_hand_icon;
		},
	},
	methods: {
		discardHand() {
			/**
			 * Tells the server to discard the hand of the mediums
			 */
			this.confirmVisible = false;

			console.debug(`Telling server to discard team's hand.`);
			this.$socket.client.emit(`NewHand`, {
				game_code: this.$store.state.game_code,
				team: this.$store.state.team
			});
		},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#DiscardHandButton {
	height: var(--size);
	width: var(--size);
	position: absolute;
	--size: 120px;
	bottom: 0;
	right: 0;
}

button {
	outline: none;
}

.discard-hand {
	background-color: var(--background3);
	border-radius: 100% 0 0 0;
	position: relative;
	border-style: none;
	height: 100%;
	width: 100%;
	padding: 0;
}

.icon {
	position: absolute;
	bottom: 15px;
	right: 15px;
	width: 60px;
}

.buttons {
	justify-content: space-evenly;
	display: flex;
}

.modal-button {
	border-radius: 7px;
	border-style: none;
	font-size: larger;
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