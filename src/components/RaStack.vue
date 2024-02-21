<script setup>
import { computed, ref } from "vue"

const props = defineProps({
	label: {
		type: String,
		default: "label",
	},
})
</script>

<template>
	<div class="ra-stack">
		<!-- <div class="ra-stack__label">{{ label }}</div> -->
		<slot></slot>
	</div>
</template>

<style>
.ra-stack {
	display: flex;
	flex-direction: column;
	/* width: 300px; */
	flex: 1;
	gap: 0.25em;
	/* padding: 0.25em; */
	position: static !important;
}

.ra-stack__label {
	font-size: 0.75em;
	font-weight: bolder;
}
</style>
