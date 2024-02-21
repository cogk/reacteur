<script setup>
// @ts-check
import { computed } from "vue"
import { useGraphStore } from "../../stores/graph.js"
import { useSelectionStore } from "../../stores/selection.js"
import RbdAttr from "./RbdAttr.vue"
import RaEditorForType from "./RaEditorForType.vue"

const { selectSmart } = useSelectionStore()

const props = defineProps({
	id: {
		type: String,
		default: "",
	},
})

const node = computed(() => {
	return useGraphStore().getNode(props.id)
})
</script>

<template>
	<div v-if="node" class="ra-block-details" @click="selectSmart($event, node.id)">
		<RbdAttr type="@id">
			<template #key>ID</template>
			<template #value>{{ node.id }}</template>
		</RbdAttr>

		<RbdAttr type="@label">
			<template #key>Label</template>
			<template #value="{ inputRef }">
				<RaEditorForType :inputRef="inputRef" v-model="node.label" type="@label" />
			</template>
		</RbdAttr>

		<RbdAttr v-for="arg in node.args" :type="arg.type">
			<template #key>{{ arg.key }}</template>
			<template #value>
				<RaEditorForType v-model="arg.value" :type="arg.type" />
			</template>
		</RbdAttr>
	</div>
</template>

<style>
.ra-block-details {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	padding: 0.5em;
}
</style>
