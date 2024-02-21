<script setup>
import { computed } from "vue"
import RaSubflowEditor from "./RaSubflowEditor.vue"

const props = defineProps({
	modelValue: {
		type: [Object, String, Number, Boolean, Array],
		default: "",
	},
	type: {
		type: String,
		default: "",
	},
})

const emit = defineEmits(["update:modelValue"])

const reactiveModelValue = computed({
	get: () => props.modelValue,
	set: (val) => emit("update:modelValue", val),
})
</script>

<template>
	<input v-if="type == '@label'" v-model="reactiveModelValue" />
	<input type="checkbox" v-else-if="type == 'check'" v-model="reactiveModelValue" />
	<textarea v-else-if="type == 'text'" v-model="reactiveModelValue"></textarea>
	<RaSubflowEditor v-else-if="type == 'subflow'" v-model="reactiveModelValue" />
	<div v-else>{{ type }}: {{ modelValue }}</div>
</template>
