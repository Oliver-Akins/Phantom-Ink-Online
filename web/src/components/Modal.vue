<template>
	<transition name="fade" @after-enter="content = true">
		<div
			v-if="show"
			class="modal-container"
			@click.self.stop="content = false"
		>
			<transition name="burst" @after-leave="$emit('close')">
				<div v-if="content" class="modal">
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
	},
	data() {return {
		content: false,
	}},
}
</script>

<style>
@import "css/theme.css";
@import "css/style.css";
@import "css/transitions.css";

.modal-container {
	background-color: var(--modal-background-blur);
}

.modal {
	background-color: var(--modal-content-background);
	color: var(--modal-content-text);
}
</style>