<script setup>
defineProps({
	type: { type: String, default: "circle" },
	x: { type: Number, required: true },
	y: { type: Number, required: true },
	angle: { type: Number, required: true },
	size: { type: Number, default: 3 },
})
</script>

<template>
	<circle v-if="type === 'circle'" :cx="x" :cy="y" :r="size * 2" />
	<circle v-else-if="type === 'dot'" :cx="x" :cy="y" :r="size" stroke="none" />
	<polygon
		v-else-if="type === 'arrow'"
		:points="`0,-${size} ${size * 2},0, 0,${size}`"
		:transform="`translate(${x},${y}) rotate(${angle * (180 / Math.PI)})`"
	/>
</template>
