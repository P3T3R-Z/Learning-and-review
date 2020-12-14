<template>
  <input type="text" :value="val" @input="$emit('update:val', $event.target.value)"/>
</template>

<script>
export default {
  props: {
    val: String,
  },
};
</script>

<style>
</style>