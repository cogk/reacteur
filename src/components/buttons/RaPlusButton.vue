<script setup>
import { useGraphStore } from "../../stores/graph.js"
import { PlusIcon } from "@radix-icons/vue"
import RaBlockActionButton from "./RaBlockActionButton.vue"

const props = defineProps({
	afterId: {
		type: String,
		default: "",
	},
	insideId: {
		type: String,
		default: "",
	},
	label: {
		type: String,
		default: "Insert a new block",
	},
})

const onClick = () => {
	const graphStore = useGraphStore()
	const newNode = {
		id: `new-${props.afterId}-${props.insideId}-` + Math.random().toString(36).substring(7),
		label: "New",
	}
	graphStore.addNode(newNode, {
		after: props.afterId,
		inside: props.insideId,
	})
}
</script>

<template>
	<RaBlockActionButton :label="label" @click="onClick">
		<PlusIcon />
	</RaBlockActionButton>
</template>
