<script setup>
import RaIconForType from "./RaIconForType.vue"

const props = defineProps({
	type: {
		type: String,
		default: "",
	},
})
</script>

<template>
	<div class="rbd-attr">
		<div class="rbd-attr__key">
			<slot name="key"></slot>
		</div>
		<div class="rbd-attr__value">
			<slot name="value">
				<em>No value</em>
			</slot>
		</div>
		<div class="rbd-attr__icon" :title="type" :aria-label="type">
			<span class="sr-only">{{ type }}</span>
			<RaIconForType :type="type" />
		</div>
	</div>
</template>

<style>
.rbd-attr {
	border: 1px solid var(--border-color);
	border-radius: 0.25em;
	position: relative;

	display: grid;
	align-items: baseline;
	grid-template-areas: "icon key" "value value";
	grid-template-columns: 28px auto;
}

.rbd-attr__key {
	grid-area: key;
	align-self: center;
	font-size: 0.8em;
	font-weight: bolder;
	user-select: all;
}

.rbd-attr__value {
	padding: 0.5em 0.5em;
	padding-top: 0px;
	grid-area: value;
	user-select: all;
	display: flex;
}

.rbd-attr__value > :is(input, select, textarea) {
	flex: 1;
}

/* .rbd-attr__type {
	grid-area: type;
	justify-self: end;
	font-size: 0.75em;
	font-weight: bold;
	background-color: hsl(180, 84%, 70%);
	padding: 0.125em 0.75em;
	border-radius: 999px;
	user-select: all;
} */

.rbd-attr__icon {
	grid-area: icon;
	margin: 0.25em;

	display: grid;
	place-items: center;
	align-self: baseline;
	width: 20px;
	height: 20px;
	/* background-color: var(--fg-color); */
	border-radius: 0.25em;
}
</style>
