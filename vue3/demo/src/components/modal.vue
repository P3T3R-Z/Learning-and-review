<template>
  <teleport to="#app">
    <div class="modal" v-if="modalshow">
      <div class="modal-container">
        <h1>模态框</h1>

        <div>
          <button @click="modalshow = false">关闭</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      modalshow: false,
    };
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.modal-container {
  width: 300px;
  height: 250px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>