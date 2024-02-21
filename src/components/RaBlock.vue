<script setup>
import { computed } from "vue"
import { useGraphStore } from "../stores/graph.js"
import { useSelectionStore, selectSmart } from "../stores/selection.js"
import RaIconForType from "./details/RaIconForType.vue"

const props = defineProps({
	id: {
		type: [String, Number],
		default: "label",
	},
})

const graphStore = useGraphStore()
const node = computed(() => graphStore.getNode(props.id))

const selectionStore = useSelectionStore()
const selected = computed(() => selectionStore.isSelected(props.id))

const classes = computed(() => {
	return {
		"ra-block--selected": selected.value,
	}
})
</script>

<template>
	<div v-if="!node" style="background-color: #500; color: #fff">No node with id {{ props.id }} found</div>
	<template v-else-if="node?.type === 'Sequence'"></template>
	<div
		v-else-if="node"
		class="ra-block ra-clickable"
		:class="classes"
		@click="selectSmart($event, node.id)"
		v-bind="$attrs"
	>
		<div class="ra-block__icon-start">
			<RaIconForType :type="node.type" />
		</div>
		<span class="ra-block__label">
			{{ node.label }}
		</span>
	</div>
</template>

<style>
.ra-block {
	padding: 0.5em 1em;
	padding-left: 28px;

	background-color: var(--block-bg);
	color: inherit;
	user-select: none;
	box-shadow: inset 0 0 0 1px var(--block-border);
	border-radius: var(--border-radius);
	position: relative;

	display: flex;
	align-items: center;
}

.ra-block--selected {
	background-color: var(--block-bg-selected);
	box-shadow: inset 0 0 0 2px var(--block-border-selected);
}

.ra-block__icon-start {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 28px;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
