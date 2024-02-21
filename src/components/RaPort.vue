<script setup>
// @ts-check
import { useDomRefsStore } from "../stores/domrefs.js"
import { onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
	uid: {
		type: String,
		default: () => Math.random().toString(36).substring(7),
	},
	label: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "empty",
		validate: (value) => ["empty", "filled"].includes(value),
	},
	shape: {
		type: String,
		default: "circle",
		validate: (value) => ["square", "circle"].includes(value),
	},
})

const store = useDomRefsStore()
const refForArrow = ref(null)

onMounted(() => store.setRef(props.uid, refForArrow))
onUnmounted(() => store.deleteRef(props.uid))
</script>

<template>
	<div class="ra-port" :class="`ra-port--${props.type} ra-port--${props.shape}`">
		<div class="ra-port__decoration" ref="refForArrow"></div>
		<div class="ra-port__label">
			<span>
				{{ props.label }}
			</span>
		</div>
	</div>
</template>

<style>
.ra-port {
	display: grid;
	grid-template-columns: 1fr 0.75em minmax(0, 1fr);
	align-items: center;
	gap: 0.25em;
	height: 1em;
	max-height: 1em;
	line-height: 1em;
	user-select: none;
}

.ra-port__decoration {
	grid-column: 2 / span 1;
	height: 0.75em;
	width: 0.75em;
}

.ra-port__label {
	grid-column: 3 / span 1;
	font-weight: bold;
	font-size: 0.7em;
	width: max-content;
	padding: 0 0.25em;
	border-radius: var(--border-radius);
	background: var(--bg-color);
	pointer-events: none;
}

.ra-port--square .ra-port__decoration {
	border-radius: 0.125em;
}

.ra-port--circle .ra-port__decoration {
	border-radius: 999px;
}

.ra-port--empty .ra-port__decoration {
	border: 1px solid currentColor;
}

.ra-port--filled .ra-port__decoration {
	border: 1px solid currentColor;
	box-shadow: inset 0 0 0 1.5px var(--bg-color);
	background-color: currentColor;
}
</style>
