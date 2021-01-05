<template>
	<div id="ObjectBoard">
		<div
			class="object"
			v-for="objectIndex in objects.length"
			:key="`object-${objectIndex}`"
		>
			<span class="text">
				{{ objectIndex }}. {{ objects[objectIndex - 1] }}
			</span>
			<button
				class="clickable"
				@click.stop="selectObject(objectIndex)"
			>
				{{ buttonLabel }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: `ObjectSelector`,
	components: {},
	data() {return {
		objects: [],
	}},
	computed: {
		buttonLabel() {
			return this.$store.state.writer_object_choose_button;
		},
		gameCode() {
			return this.$store.state.game_code;
		},
	},
	methods: {
		selectObject(objectIndex) {
			/**
			 * Sends the chosen object to the server so that the game can begin properly.
			 */
			let data = {
				game_code: this.gameCode,
				choice: this.objects[objectIndex - 1],
			};
			this.$socket.client.emit(`SelectObject`, data);
		},
		getObjects() {
			/**
			 * Gets the objects on the card from the server. This method will
			 * return the same values for all spirit.
			 */
			this.$socket.client.emit(`ObjectList`, {
				game_code: this.$store.state.game_code,
			});
		},
	},
	sockets: {
		ObjectList(data) {
			/**
			 * The response event from the server for the list of objects that
			 * are on the card which we have drawn for the round.
			 */
			this.objects = data.objects;
		},
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
	},
	mounted() {
		this.getObjects();
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#ObjectBoard {
	background-color: var(--board-background);
	color: var(--board-background-text);
	justify-content: space-evenly;
	padding-bottom: 10px;
	flex-direction: row;
	border-radius: 20px;
	margin: 15px auto;
	flex-wrap: wrap;
	display: flex;
	width: 95%;
}

.object {
	background-color: var(--board-background-alt);
	color: var(--board-background-alt-text);
	justify-content: center;
	flex-direction: column;
	border-radius: 10px;
	display: flex;
	padding: 15px;
	margin: 10px;
	width: 40%;
}

.text {
	justify-content: center;
	align-items: center;
	display: flex;
	flex-grow: 1;
}

button {
	background: var(--card-button);
	border-radius: 7px;
	font-size: larger;
	padding: 7px;
	margin: 10px;
}
button:hover { background-color: var(--card-button-darken); }
button:focus { background-color: var(--board-background-alt-lighten); }
</style>