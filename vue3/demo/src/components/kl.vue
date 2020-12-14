<template>
  <h3>我是缓存组件</h3>
</template>

<script>
export default {
  activated() {
    console.log("keep-alive缓存组件激活时");
  },
  deactivated() {
    console.log("keep-alive缓存组件停止时");
  },
};
</script>

<style>
</style>