<script setup>
import { ref } from "vue"
import { useSelectionStore } from "../stores/selection.js"
import RaBlockDetails from "./details/RaBlockDetails.vue"

const selectionStore = useSelectionStore()
</script>

<template>
	<div class="ra-sidebar">
		<template v-for="id in selectionStore.selection">
			<RaBlockDetails :id="id" />
		</template>

		<div v-if="!selectionStore.selection.size">Click on a block to see its details and edit its properties.</div>
	</div>
</template>

<style>
.ra-sidebar {
	display: flex;
	flex-direction: column;
	width: 300px;
	gap: 0.25em;
	padding: 0.25em;
	border-inline-start: 1px solid var(--text-color);
}
</style>
