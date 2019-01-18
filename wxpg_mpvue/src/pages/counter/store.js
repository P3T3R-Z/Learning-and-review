// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { // 组件间共享的数据
  count: 0
}

const mutations = { // 修改共享数据
  increment: (state) => {
    const obj = state
    obj.count += 1
  },
  decrement: (state) => {
    const obj = state
    obj.count -= 1
  }
}

const getters = { // 获取共享数据
  getcount: state => {
    return state.count
  }
}

export default new Vuex.Store({
  getters,
  state,
  mutations
})