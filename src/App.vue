<script setup>
import RaTimeline from "./components/RaTimeline.vue"
import RaSidebar from "./components/RaSidebar.vue"
</script>

<template>
	<div id="app">
		<header>
			<img alt="Vue logo" class="logo" src="./assets/logo.svg" width="16" height="16" />
			<h1>Lorem</h1>
		</header>

		<main>
			<RaTimeline />
		</main>

		<RaSidebar />
	</div>
</template>

<style scoped>
#app {
	min-height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 1fr 300px;
}

header {
	padding: 0em 1em;
	display: flex;
	align-items: center;
	gap: 0.5em;
	grid-column: 1 / -1;
	position: relative;
	border-bottom: 1px solid var(--text-color);
}
header::before {
	content: "";
	position: absolute;
	inset: 0;
	opacity: 1;
	backdrop-filter: blur(2px);
	z-index: -1;
}

header h1 {
	font-size: initial;
	font-weight: bold;
}

main {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
