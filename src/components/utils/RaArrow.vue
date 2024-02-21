<script setup>
import { getArrow } from "perfect-arrows"
import { computed } from "vue"
import RaArrowShape from "./RaArrowShape.vue"

const props = defineProps({
	x1: { type: Number, required: true },
	y1: { type: Number, required: true },
	x2: { type: Number, required: true },
	y2: { type: Number, required: true },
	color: { type: String, default: "currentColor" },
	padStart: { type: Number, default: 0 },
	padEnd: { type: Number, default: 9 },
	stretch: { type: Number, default: 0.3 },
	startType: { type: String, default: "dot" },
	endType: { type: String, default: "arrow" },
	// style: { type: [String, Object], default: '' },
	label: { type: String, default: "qsdf" },
})

const arrow = computed(() => {
	const opts = {
		bow: 0.03,
		stretch: props.stretch,
		stretchMin: 0,
		stretchMax: 200,
		padStart: props.padStart,
		padEnd: props.padEnd,
		flip: false,
		straights: true,
	}

	const [sx, sy, cx, cy, ex, ey, ae, as, ec] = getArrow(props.x1, props.y1, props.x2, props.y2, opts)
	return { sx, sy, cx, cy, ex, ey, ae, as, ec }
})
</script>

<template>
	<svg class="ra-arrow">
		<g :stroke="color" :fill="color" stroke-width="3">
			<RaArrowShape class="ra-arrow__tail" :type="startType" :x="arrow.sx" :y="arrow.sy" :angle="arrow.as" />
			<path
				class="ra-arrow__line"
				:d="`M${arrow.sx},${arrow.sy} Q${arrow.cx},${arrow.cy} ${arrow.ex},${arrow.ey}`"
				fill="none"
				style="pointer-events: stroke"
			/>
			<path
				v-if="false"
				:d="`M${arrow.sx},${arrow.sy} Q${arrow.cx},${arrow.cy} ${arrow.ex},${arrow.ey}`"
				fill="none"
				stroke="transparent"
				stroke-width="0"
				style="pointer-events: stroke"
			/>
			<RaArrowShape class="ra-arrow__head" :type="endType" :x="arrow.ex" :y="arrow.ey" :angle="arrow.ae" />
			<text
				v-if="label"
				class="ra-arrow__label"
				:x="arrow.cx"
				:y="arrow.cy"
				text-anchor="middle"
				dominant-baseline="middle"
				fill="currentColor"
				stroke="none"
			>
				{{ label }}
			</text>
		</g>
	</svg>
</template>

<style>
.ra-arrow {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: visible;
}

.ra-arrow:hover {
	color: var(--primary-light);
	filter: drop-shadow(0 0 0.5em var(--primary-light));
}
</style>
