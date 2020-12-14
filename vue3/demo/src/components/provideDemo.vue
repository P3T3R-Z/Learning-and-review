<template>
  <div>
    {{ message }}
    <input type="text" v-model="message" />
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  //  inject:['message']
  setup() {
    let message = inject("message");
    return { message };
  },
};
</script>

<style>
</style>