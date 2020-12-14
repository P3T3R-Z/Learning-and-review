<template>
  <div id="foot">
    {{ msg }}
    <button @click="tohead">传入到header组件</button>
  </div>
</template>

<script>
import event from "@/model/event";

export default {
  data() {
    return {
      msg: "foot",
    };
  },
  methods: {
    tohead() {

        //非父子组件传值
        event.emit('tohead', this.msg)
    },
  },
};
</script>

<style>
#foot {
  height: 60px;
  line-height: 60px;
  background: #eee;
}
</style>