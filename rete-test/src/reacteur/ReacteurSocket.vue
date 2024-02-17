<template>
  <div class="socket" :title="data.name"></div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid grey;
  width: 24px;
  height: 24px * 2;
  vertical-align: middle;
  background: #fff;
  z-index: 2;
  box-sizing: border-box;

  &:hover {
    background: #ddd;
  }
}
</style>
