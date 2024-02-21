<script setup>
// @ts-check
import RaBranch from "./RaBranch.vue"
import { useLayout } from "../utils/layout.js"
import RaSequence from "./RaSequence.vue"
import { useSelectionStore } from "../stores/selection.js"
import { provide } from "vue"
import { useGraphStore } from "../stores/graph.js"

provide("inMainView", true)

const graphStore = useGraphStore()
const rows = useLayout()

function onClick(event) {
	if (!event.target.closest(".ra-block,.ra-stack,.ra-clickable")) {
		useSelectionStore().selectClear()
	}
}
</script>

<template>
	<button v-if="graphStore.viewFilter.length" @click="graphStore.viewFilter = []">Clear filters</button>

	<div class="ra-timeline" @click="onClick">
		<RaBranch v-for="row in rows">
			<RaSequence :bb="bb" v-for="bb in row" />
		</RaBranch>
	</div>
</template>

<style>
.ra-timeline {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25em;
	padding: 2.5em 0.5em;
}
</style>
