<template>
  <path :d="path" :style="{ transform: `rotate(${angle}deg)`, transformOrigin: 'center' }" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  x: { type: [String, Number], default: 0 },
  y: { type: [String, Number], default: 0 },
  r: { type: [String, Number], default: 12 },
  angle: { type: [String, Number], default: 0 },
})

const path = computed(() => {
  const { x, y, r } = props
  const x1 = x - r/2
  const y1 = y - r/2
  const x2 = x - r/2
  const y2 = y + r/2
  const x3 = x + r/2
  const y3 = y
  return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`
})
</script>
