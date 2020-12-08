<template>
	<div id="attributions-bar">
		<div
			class="bottom-bar clickable"
			@click="modal = true"
		>
			Made By: Oliver Akins
		</div>
		<ModalAnimation
			:show="modal"
			@closed="modal = false"
		>
			<h2 class="centre">Site Attributions:</h2>
			<hr>
			<h3>Site Made By: Oliver Akins</h3>
			<hr>
			<h3>Open Source Libraries:</h3>
			<ul>
				<li>Potatoes</li>
			</ul>
		</ModalAnimation>
	</div>
</template>

<script>
import Modal from "./Modal";

export default {
	name: ``,
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
	position: absolute;
	height: 35px;
	width: 100%;
	bottom: 0;
}

.bottom-bar {
	background-color: var(--background2);
	color: var(--background2-text);
	border-radius: 15px 15px 0 0;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	display: flex;
	height: 100%;
	width: 25%;
}
</style>