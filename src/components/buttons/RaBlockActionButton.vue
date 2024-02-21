<script setup>
const props = defineProps({
	label: {
		type: String,
		default: "Insert a new block",
	},
})
</script>

<template>
	<button class="btn-reset ra-block-action-button" :title="label" :aria-label="label">
		<slot></slot>
	</button>
</template>

<style>
.ra-block-action-button {
	user-select: none;
	min-width: 1.25em;
	height: 1.25em;
	line-height: 1.25em;
	background: var(--fg-color);
	border: 1px solid var(--text-color);
	box-shadow: var(--shadow-xl);
	border-radius: 999px;

	display: flex;
	justify-content: center;
	align-items: center;
}

/* Interactions with parent components */
.ra-stack-row {
	position: relative;
}

.ra-stack .ra-block-action-button {
	--shown: 0;
	position: absolute;
	bottom: 0;
	transform: translateY(50%) scale(var(--shown));
	opacity: var(--shown);

	z-index: 1;
	align-self: center;
	margin: 0px auto;

	transition: all 0.25s ease;
	transition-property: opacity, transform;
}

.ra-stack .ra-block-action-button:hover {
	--shown: 1;
}

.ra-stack:hover .ra-stack-row[data-index="0"]:not(:has(+ .ra-stack__blocks:hover)) .ra-block-action-button,
.ra-stack-row:hover > .ra-block-action-button {
	--shown: 1;
	opacity: 1;
}
</style>
