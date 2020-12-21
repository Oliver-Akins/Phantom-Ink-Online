<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="show"
			class="modal-container"
			:class="closable ? 'clickable' : 'unclickable'"
			@click.self.stop="handleBackgroundClick"
		>
			<transition name="burst" @after-leave="$emit('closed')">
				<div v-if="content" class="modal unclickable">
					<slot />
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: `ModalAnimation`,
	props: {
		show: {
			required: true,
			type: Boolean,
		},
		closable: {
			required: false,
			type: Boolean,
			default: true,
		}
	},
	data() {return {
		content: false,
	}},
	methods: {
		handleBackgroundClick() {
			if (this.closable) {
				this.content = false;
			};
		},
	},
}
</script>

<style>
@import "../css/theme.css";
@import "../css/style.css";
@import "../css/transitions.css";

.modal-container {
	background-color: var(--modal-background-blur);
	justify-content: center;
	align-items: center;
	position: fixed;
	display: flex;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	left: 0;
	top: 0;
}

.modal {
	background-color: var(--modal-content-background);
	color: var(--modal-content-text);
	border-radius: 20px;
	overflow-y: auto;
	max-height: 75%;
	padding: 15px;
	z-index: 11;
	width: 40%
}
</style>