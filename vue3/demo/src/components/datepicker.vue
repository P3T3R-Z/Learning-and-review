<template>
  <div>
      <!-- 绑定继承的 -->
      <input type="date" v-bind="$attrs">
  </div>
</template>

<script>
export default {
    inheritAttrs: false, //禁止默认继承到根节点
}
</script>

<style>

</style>