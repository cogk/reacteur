<script setup>
// @ts-check
import { computed, nextTick, ref, triggerRef, watch, watchEffect } from "vue"
import { useDomRefsStore } from "../../stores/domrefs.js"
import RaArrow from "./RaArrow.vue"
import { useGraphStore } from "../../stores/graph.js"

const store = useDomRefsStore()

const props = defineProps({
	uid1: {
		type: String,
		default: "",
	},
	uid2: {
		type: String,
		default: "",
	},
	label: {
		type: String,
		default: "",
	},
})

const ref1 = computed(() => store.getRef(props.uid1))
const ref2 = computed(() => store.getRef(props.uid2))
const n = ref(0)

const arrow = computed(() => {
	n.value

	if (!ref1.value || !ref2.value) {
		return
	}

	const rect1 = ref1.value.getBoundingClientRect()
	const rect2 = ref2.value.getBoundingClientRect()

	const x1 = rect1.left + rect1.width / 2 + window.scrollX
	const y1 = rect1.top + rect1.height / 2 + window.scrollY
	const x2 = rect2.left + rect2.width / 2 + window.scrollX
	const y2 = rect2.top + rect2.height / 2 + window.scrollY

	return { x1, y1, x2, y2 }
})

watch([ref1, ref2, useGraphStore()], () => nextTick(() => n.value++))
</script>

<template>
	<RaArrow v-if="arrow" :x1="arrow.x1" :y1="arrow.y1" :x2="arrow.x2" :y2="arrow.y2" :label="label" startType="none" />
</template>
