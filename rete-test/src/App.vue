<template>
  <div id="app">
    <div class="rete" ref="rete"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { createEditor } from './rete';

export default defineComponent({
  name: 'App',
  async mounted() {
    await createEditor(this.$refs.rete)
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.rete {
  position: relative;
  width: 80vw;
  height: 90vh;
  font-size: 1rem;
  background: white;
  margin: 1em auto;
  border-radius: 1em;
  text-align: left;
  border: 3px solid #55b881;
}
</style>
