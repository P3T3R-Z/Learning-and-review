<template>
  <div class="home">
    <div>
      <h1>emits: 检验子传父参数</h1>

      <Header @headclick="fromhead" />
    </div>

    <div>
      <h1>v-model:val</h1>
      自定义组件数据双向绑定
      <my-input v-model:val="inputval"></my-input>
      <br />
      {{ inputval }}
    </div>

    <div>
      <h1>inheritAttrs:false, v-bind="$attrs"</h1>
      禁止默认继承属性到子节点的根节点:
      <datepicker data-time="2020-11-11" class="picker" />
    </div>

    <div>
      <h1>vue3.x生命周期:</h1>
      beforeCreate, created, beforeMount, mounted, beforeUpdate, updated ,
      activated, deactivated, beforeUnmount, unmouted

      <button @click="msg = Math.random() * 10">更新msg{{ msg }}</button>
      <button @click="klshow = !klshow">切换缓存组件</button>
      <keep-alive>
        <kl v-if="klshow" />
      </keep-alive>
    </div>

    <div>
      <h1>mixin:</h1>
      {{ title }}
    </div>

    <div>
      <h1>teleport:</h1>
      <button @click="$refs.modal.modalshow = true">
        开启模态框
        <modal ref="modal" />
      </button>
    </div>

    <div>
      <h1>组合式composition API:</h1>
      <br />
      <h1>ref</h1>
      title:
      {{ title }}
      <br />
      <button @click="gettitle">获取title</button>
      <br />
      <button @click="settitle">设置title</button>
      <br />
      <input type="text" v-model="title" />
      <br />
      <br />
      <br />

      <h1>reactive</h1>
      userinfo:
      {{ userinfo.name }}--{{ userinfo.age }}
      <br />
      <br />
      <br />
      <button @click="getUserinfo">获取userinfo</button>
      <br />

      <button @click="setUserinfo">设置userinfo</button>
      <br />
      <input type="text" v-model="userinfo.name" />
      <br />
      <br />
      <br />

      <h1>toRefs</h1>
      article:
      <br />
      {{ articleName }}
      <br />
      <input type="text" v-model="articleName" />
      <br />
      <br />

      <h1>computed</h1>
      <input type="text" v-model="firstName" />
      <input type="text" v-model="lastName" />

      {{ fullname }}

      <br />
      <br />
      <h1>原始数据</h1>
      {{ go.name }}
      <br />
      <br />

      <h1>readonly</h1>
      <input type="text" v-model="readonlyUserinfo.name" />
      {{ readonlyUserinfo.name }}
      <br />
      <br />

      <h1>watchEffect</h1>
      num:{{ num }}
      <br />
      <br />

      <h1>watch</h1>
      list2:{{ list2 }}
    </div>

    <div>
      <h1>provide, inject</h1>
      用于多层嵌套,父组件传值
      <br/>
      非组合式中使用provide,父组件无法修改子组件中的数据, 组合式可以互相影响
      <br/>
      <button @click="changemsg">修改provide的数据</button>
      <provide-demo />
    </div>

    <div>
      <h1>mitt: 非父子组件传值</h1>

      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import myInput from "./components/myInput.vue";
import datepicker from "./components/datepicker.vue";
import kl from "./components/kl.vue";
// import baseMixin from "./mixin/baseMixin"

import modal from "./components/modal";
import provideDemo from "./components/provideDemo";
import {
  ref,
  reactive,
  toRefs,
  computed,
  readonly,
  watchEffect,
  watch,
  onMounted,
  provide
} from "vue";
export default {
  // mixins: [baseMixin],
  name: "App",
  data() {
    return {
      inputval: "2",
      msg: "123",
      klshow: false,
      message: "我是父组件的message",
    };
  },
  //非组合式api写法
  // provide() {
  //   return {
  //     message: this.message,
  //   };
  // },
  setup(props) {
    //props 父组件传值
    //此生命周期处于beforecreate, created之前
    console.log("setup");
    //ref 定义响应式数据 字符串,number,boolean,array
    //reactive 定义响应式数据  object
    //toRefs 解构响应式数据
    let title = ref("我是标题");
    let userinfo = reactive({
      name: "张三",
      age: 20,
    });
    let article = reactive({
      articleName: "文章标题",
      click: 200,
    });

    //获取reactive定义的数据
    let getUserinfo = function () {
      alert(userinfo.name);
    };
    //获取ref定义的数据
    let gettitle = function () {
      alert(title.value);
    };

    //设置reactive定义的数据
    let setUserinfo = function () {
      userinfo.name = "李四";
    };
    //设置ref定义的数据
    let settitle = function () {
      title.value = "修改后的ref的title";
    };

    //计算属性
    let niceman = reactive({
      firstName: "zhang",
      lastName: "san",
    });

    //computed计算属性
    let fullname = computed(() => {
      return niceman.firstName + " " + niceman.lastName;
    });

    //非响应数据, 原始数据
    let go = {
      name: "旺旺",
    };
    // 只读代理
    let readonlyUserinfo = readonly({
      name: "王五",
    });

    //watchEffect, 初始时会触发
    let list = reactive({
      num: 1,
      count: 1,
    });
    watchEffect(() => {
      console.log(`num=${list.num}`);
    });

    setInterval(() => {
      list.num++;
    }, 1000);

    //watch可以指定监听数据变动, 不能监听对象的某个属性, watchEffect可以
    let list2 = ref(2);
    watch(list2, (newvalue, oldvalue) => {
      console.log(`newvalue:${newvalue}, oldvalue:${oldvalue}`);
    });
    setInterval(() => {
      list2.value++;
    }, 1000);

    //生命周期
    onMounted(() => {
      console.log("onMounted");
    });


    //provide
    let message=ref('我是父组件的provide注入的数据')
    provide('message', message)
    let changemsg = function(){
      message.value = '12'
    }
    return {
      title,
      userinfo,
      getUserinfo,
      gettitle,
      setUserinfo,
      settitle,
      // ...article 错误写法,会丢失响应式
      ...toRefs(article),
      ...toRefs(niceman),
      fullname,
      go,
      readonlyUserinfo,
      ...toRefs(list),
      list2,
      changemsg
    };
  },

  components: {
    Header,
    Footer,
    myInput,
    datepicker,
    kl,
    modal,
    provideDemo,
  },

  methods: {
    fromhead(val) {
      console.log(val);
    },
    // changemsg() {
    //   this.message = 123;
    //   console.log(this.message)
    // },
  },
  beforeCreate() {
    console.log("实例创建前");
  },
  created() {
    console.log("实例创建后");
  },
  // beforeMount() {
  //   console.log("渲染前");
  // },
  // mounted() {
  //   console.log("渲染后");
  // },
  // beforeUpdate() {
  //   console.log("更新前");
  // },
  // updated() {
  //   console.log("更新后");
  // },

  // beforeUnmount() {
  //   //vue2.x 为beforeDestroy
  //   console.log("卸载前");
  // },
  // unmouted() {
  //   //vue2.x 为destroyed
  //   console.log("keep-卸载后");
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home > * {
  margin-bottom: 20px;
  border-bottom: 1px solid #000;
}
</style>
