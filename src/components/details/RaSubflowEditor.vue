<script setup>
import { useGraphStore } from "../../stores/graph.js"
import RaSequence from "../RaSequence.vue"

const props = defineProps({
	modelValue: {
		type: [Object, String, Number, Boolean, Array],
		default: "",
	},
})

const graphStore = useGraphStore()
const onClick = (event) => {
	console.log("onClick", event, props.modelValue)
	event.stopPropagation()
	event.preventDefault()

	graphStore.viewFilter = [props.modelValue]
}
</script>

<template>
	<button class="btn-reset ra-subflow-open-in-editor" @click.capture="onClick">
		<div class="sr-only">Open subflow #{{ modelValue }} in the editor.</div>
		<div aria-hidden="true">
			<RaSequence :id="modelValue" />
		</div>
	</button>
</template>

<style>
.ra-subflow-open-in-editor {
	flex: 1;
	font-size: 0.7em;
}
.ra-subflow-open-in-editor [aria-hidden="true"],
.ra-subflow-open-in-editor [aria-hidden="true"] * {
	pointer-events: none;
}
</style>
