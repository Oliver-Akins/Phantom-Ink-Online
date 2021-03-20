<template>
	<div id="ObjectReminder">
		<span class="text">
			Object:
			<br>
			{{ targetObject }}
		</span>
	</div>
</template>

<script>
export default {
	name: `ObjectReminder`,
	components: {},
	computed: {
		targetObject() {
			return this.$store.state.chosen_object;
		},
	},
	methods: {},
}
</script>

<style scoped>
@import "../css/theme.css";
@import "../css/style.css";

#ObjectReminder {
	background-color: var(--object-reminder-background);
	color: var(--object-reminder-text);
	border-radius: 100% 0 0 0;
	height: var(--size);
	width: var(--size);
	position: fixed;
	--size: 120px;
	bottom: 0;
	right: 0;
}

.text {
	text-align: center;
	position: absolute;
	font-size: large;
	bottom: 30px;
	right: 20px;
}
</style>