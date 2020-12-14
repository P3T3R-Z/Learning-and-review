<template>
  <div id="header">
      姓名
      <input type="text" v-model="name">
      年龄
      <input type="text" v-model="age">

      <button @click="tohome">submit</button>
  </div>
</template>

<script>
import event from "@/model/event";
export default {
    data(){
        return {
            name: '',
            age: ''
        }
    },
    //子组件传父组件时验证参数, 需返回布尔类型
    emits: {
        headclick({name, age}){
            if(name!='' && age!=''){
                return true
            }else{
                return false
            }
            
        }
    },
    // emits: ['headclick'],
    mounted(){
        event.on('tohead', data=>{
            alert('header组件:'+data)
        })
    },
    methods:{
        tohome(){
            //子传父
            this.$emit('headclick', {
                name: this.name,
                age: this.age
            })
        }
    }
}
</script>

<style>
#header{
    background: #000;
    color:#fff;
    height: 60px;
    line-height: 60px;
}
</style>