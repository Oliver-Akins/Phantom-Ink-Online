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
	},
	methods: {
		selectObject(objectIndex) {
			/**
			 * Sends the chosen object to the server so that the game can begin properly.
			 */
			let data = {
				choice: this.objects[objectIndex - 1],
			};

			this.$store.state.chosen_object = data.choice;

			console.debug(data)
			// TODO -> Send data to the server
		},
		getObjects() {
			/**
			 * Gets the objects on the card from the server. This method will
			 * return the same values for all spirit.
			 */
			this.objects = [ `Potato`, `Salad`, `Foo`, `Bar` ];

			// TODO -> Actually get the data from the server
		},
	},
	sockets: {
		ObjectList(data) {
			/**
			 * The response event from the server for the list of objects that
			 * are on the card which we have drawn for the round.
			 */
			/**
			 * data = {
			 *     objects: String[],
			 * }
			 */
			this.objects = data.objects;
		},
		ChosenObject(data) {
			/**
			 * Sent to all clients so that they can set their store data and in
			 * turn stay synchronized on what object they are trying to get
			 * their teammate to guess.
			 */
			/**
			 * data = {
			 *     choice: String,
			 * }
			 */
			console.debug(data)
			this.$store.state.chosen_object = data.choice;
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
	border-style: none;
	font-size: larger;
	outline: none;
	padding: 7px;
	margin: 10px;
}
button:hover { background-color: var(--card-button-darken); }
button:focus { background-color: var(--board-background-alt-lighten); }
</style>