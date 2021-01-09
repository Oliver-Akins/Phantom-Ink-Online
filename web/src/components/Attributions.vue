<template>
	<div id="attributions-bar">
		<div
			class="bottom-bar clickable"
			@click.stop="modal = true"
		>
			Made By: Oliver Akins (Alkali Metal)
		</div>
		<ModalAnimation
			:show="modal"
			@closed="modal = false"
		>
			<h2 class="centre">Attributions:</h2>
			<p class="centre">
				Ghost Writer is designed and created by
				<a href="resonym.com" target="_blank" rel="noopener">Resonym</a>
				<br>
				Online Prototype Made By: Oliver Akins (Alkali Metal)
				<br>
				<a :href="$store.state.survey_link" target="_blank" rel="noopener">
					<button class="clickable">
						Complete The Survey
					</button>
				</a>
			</p>
			<hr>
			<p>
				Tooling:
				<ul>
					<li
						v-for="(link, name) in tooling"
						:key="name"
					>
						<a :href="link">{{ name }}</a>
					</li>
				</ul>
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
		tooling: {
			"Vue.JS (With VueX)": "https://vuejs.org",
			"Vue-Socket.io": "https://github.com/MetinSeylan/Vue-Socket.io",
			"Vue-Clipboard2": "https://www.npmjs.com/package/vue-clipboard2",
			"Toml": "https://www.npmjs.com/package/toml",
			"tslog": "https://www.npmjs.com/package/tslog",
			"Socket.io": "https://socket.io",
			"neat-csv": "https://github.com/sindresorhus/neat-csv",
		}
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