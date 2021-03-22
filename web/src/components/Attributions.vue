<template>
	<div id="attributions-bar">
		<div
			class="bottom-bar clickable"
			@click.stop="modal = true"
		>
			Made By: Oliver Akins
		</div>
		<ModalAnimation
			:show="modal"
			@closed="modal = false"
		>
			<h2 class="centre">Attributions:</h2>
			<p class="centre">
				Ghost Writer is designed and created by
				<a href="https://resonym.com" target="_blank" rel="noopener">Resonym</a>
				<br>
				Online Prototype Made By: Oliver Akins
				<br>
				<a
					v-if="$store.state.survey_link"
					:href="$store.state.survey_link"
					target="_blank"
					rel="noopener"
				>
					<button class="clickable">
						Complete The Survey
					</button>
				</a>
			</p>
			<hr>
			<p>
				<a href="https://www.freepik.com/vectors/background">
					Background vector created by vectorpouch - www.freepik.com
				</a>
			</p>
		</ModalAnimation>
	</div>
</template>

<script>
import Modal from "./Modal";

export default {
	name: `AttributionsBar`,
	components: {
		"ModalAnimation": Modal,
	},
	data() {return {
		modal: false,
	}},
	computed: {},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#attributions-bar {
	left: calc(50% - 20%);
	position: absolute;
	height: 35px;
	width: 40%;
	bottom: 0;
}

.bottom-bar {
	background-color: var(--background2);
	color: var(--background2-text);
	border-radius: 15px 15px 0 0;
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100%;
}

button {
	background-color: var(--background2);
	color: var(--background2-text);
	border-radius: 7px;
	font-size: large;
	padding: 10px;
	margin: 5px;
}

a, a:visited {
	color: var(--light-font-colour);
}
</style>