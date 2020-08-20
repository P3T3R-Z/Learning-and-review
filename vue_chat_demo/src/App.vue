<template>
  <div id="app">
    <img src="./assets/logo.png" class="logo">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 html,body {
    background: #ccc;
    margin:0;
    height: 100%;
    overflow: hidden
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow:hidden;
}
.logo{
  width: 3rem;
  margin-top:1rem;
}
p{
  list-style:none;
}
.newMsg_p_r{
 
  width: 100%;
  margin-bottom:1rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.newMsg_p_l{
  width: 100%;
  margin-bottom:1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.mesend{
  display: flex;
  
}
.othersend{
  display: flex;
  width:50%;
}
.content{
  width: 10rem;
  border:1px solid #41b883;
  border-radius: 4px;
  color:#333;
  background: #fff;
  word-wrap:break-word;
  text-align: left;
}
.mesend .content{
  border:1px solid #41b883;
  border-radius: 4px;
  color:#fff;
  background: #41b883
}
</style>
