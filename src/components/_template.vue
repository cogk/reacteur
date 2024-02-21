<script setup>
import { computed, ref } from "vue"

const props = defineProps({
	qsdf: {
		type: String,
		default: "qsdf",
	},
})
</script>

<template>
	<div class="ra-qsdf">
		{{ props.qsdf }}
	</div>
</template>

<style>
.ra-qsdf {
	background: red;
}
</style>
