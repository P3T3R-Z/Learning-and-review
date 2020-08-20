<template>
  <div class="container" @click="clickHandle('test click', $event)">


    <i-button type="primary" bind:click="handleClick">这是一个按钮</i-button>

    <div class="userinfo" @click="bindViewTap">
      <img
        class="userinfo-avatar an"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      >
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
    </form>
    <a @click="tovuex" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from "@/components/card";

import store from "@/pages/counter/store";

export default {
  components: {
    card
  },
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      asd: true,
      
    };
  },
  //页面生命周期如下
  created() {
    console.log("created");
  },

  onLoad() {
    console.log("onLoad");
  },
  onShow() {
    console.log("onShow");
    store.commit("increment");
  },
  onReady() {
    console.log("onReady");
  },
  mounted() {
    console.log("mounted");
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    setTimeout(() => {
      this.asd = false;
    }, 4000);
  },

  onHide() {
    console.log("onHide");
    store.commit("decrement");
  },

  destroyed() {
    console.log(222);
  },
  methods: {
    handleDefault() {
      $Message({
        content: "这是一条普通提醒"
      });
    },
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    tovuex() {
      wx.switchTab({ url: "/pages/counter/main" });
    },



  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.swiper {
  height: 376rpx !important;
}
.swiper image {
  height: 100%;
  width: 100%;
}
.an {
  animation: swiming2 3s infinite linear;
  -webkit-animation: swiming2 3s infinite linear;
}
@keyframes swiming2 {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
