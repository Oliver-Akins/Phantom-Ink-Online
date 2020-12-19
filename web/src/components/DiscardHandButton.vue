<template>
	<div id="DiscardHandButton">
		AH!
	</div>
</template>

<script>
export default {
	name: `DiscardHand`,
	components: {},
	data() {return {
		confirmVisible: false,
	}},
	computed: {},
	methods: {
		discardHand() {},
	},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#DiscardHandButton {
	background-color: var(--background3);
	border-radius: 100% 0 0 0;
	height: var(--size);
	width: var(--size);
	position: fixed;
	--size: 120px;
	bottom: 0;
	right: 0;
}
</style>