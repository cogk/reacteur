<template>
  <div class="reacteur-edge">
    <svg>
      <g stroke="black" fill="transparent" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <path :d="path" />
        <!-- <circle :cx="start.x" :cy="start.y" r="4" stroke="transparent" fill="black" /> -->
        <ReacteurBasicArrowHead :x="end.x + 4" :y="end.y" r="8" fill="black" />
      </g>
    </svg>
    <div class="reacteur-edge__label" :style="labelStyle">
      {{ data?.label ?? "lorem" }}
    </div>
    <pre :style="debugStyle">
      {{ JSON.stringify({ start, end, data }, null, 2) }}
    </pre>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ReacteurBasicArrowHead from "./ReacteurBasicArrowHead.vue"

const props = defineProps({
  data: Object,
  start: Object,
  end: Object,
  path: String,
})

const lerp = (a, b, t) => a + (b - a) * t

const lerpXY = (a, b, t) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
})

const t = computed(() => {
  const hasSource = !!props.data?.source;
  const hasTarget = !!props.data?.target;
  if (hasSource && hasTarget) {
    const labelPos = props.data?.labelPos ?? "middle";
    if (labelPos === "start") {
      return 0.25;
    } else if (labelPos === "end") {
      return 0.75;
    } else {
      return 0.5;
    }
  } else if (hasSource) {
    return 0;
  } else if (hasTarget) {
    return 1;
  }
  return 0.5;
})

const mid = computed(() => lerpXY(props.start, props.end, t.value))

const labelStyle = computed(() => {
  return {
    left: CSS.px(mid.value.x),
    top: CSS.px(mid.value.y),
  };
})

const debugStyle = computed(() => {
  return {
    position: 'fixed',
    top: "0px",
    right: "0px",
    // transform: 'translate(-50%, -50%)',
    background: '#ffe',
    color: 'black',
    padding: '5px',
    fontSize: '10px',
    lineHeight: '1.2',
    borderRadius: '3px',
    fontWeight: 'bold',
  };
})
</script>

<style>
.reacteur-edge svg {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
}

.reacteur-edge__label {
  position: absolute;
  transform: translate(-50%, -50%);
  background: black;
  color: white;
  padding: 5px 10px;
  line-height: 1;
  border-radius: 99px;
  font-weight: bold;
}

.reacteur-edge > div:not(:hover) + pre {
  display: none;
}
</style>
