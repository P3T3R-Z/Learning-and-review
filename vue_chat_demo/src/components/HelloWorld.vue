<template>
  <div class="hello">
    <h1>对话demo</h1>
    <h5>version:1.0</h5>
        <hr>
    <div id="loginbox" v-if="!beginChatStatus">
        
        <div class="login">
            <span>自定义昵称：</span> <input v-model="username" id="username" @keyup.enter="login()" />
                                        
            <input type="button" value="登录" id="loginbutton" @click="login()">
        
        </div>
    </div>
    <div id="chatbox" v-show="beginChatStatus">
        <transition name="sdanimate">
            <div v-show="sd" class="sdbox">{{onlineName}}</div>
        </transition>
        <div id="content" v-html="chatDisplayshow"></div>
        
    </div>

    <div class="bottomSend-box"  v-show="beginChatStatus">
          <input type="text" placeholder="回车发送群聊" id="chatinput" v-model="chatinput" @keyup.enter="sendMessage()">
          <button @click="sendMessage()">发送</button>
    </div>
  </div>
</template>

<script>
//import * as io from 'socket.io-client'
export default {
  name: 'HelloWorld',
  data () {
    return {
      
      username: '',
      chatinput:'',

      beginChatStatus:false,
      chatDisplay:[],
      id:'',
      sd:false,
      onlineName:''
    }
  },
  sockets:{
    connect: function(){
      this.id=this.$socket.id
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  computed:{
      chatDisplayshow(){
        return this.chatDisplay.join('')
      }
  },
  mounted(){

    
        this.$socket.on("disconnect", () => {
            alert("与服务器断开连接");
        });
        this.$socket.on('message',msg=>{
            alert(msg)
        })

        let _t = this


        //渲染接收的消息
        this.showMessage = function (data) {
            
            if(data.username === this.username){
                this.chatDisplay.push(`<div class="newMsg_p_r">
                                        <div class="mesend">
                                            <div class="content">${data.message}</div>
                                            <div class="mename">:${data.username}</div>
                                        </div>
                                      </div>`)
            }else {
                this.chatDisplay.push(`<div class="newMsg_p_l">
                                        <div class="othersend">
                                            <div class="mename">${data.username}:</div>
                                            <div class="content">${data.message}</div>
                                        </div>
                                      </div>`);
            }
        };



        //客户端响应登录成功事件
        this.$socket.on('loginSuccess',(data)=>{
            /**
             * 服务器返回的用户名==输入名，就登录
             * 否则拒绝登录
             */
            if(data.username === this.username) {
                _t.beginChat(data);
            }else {
                alert("用户名不匹配，请重试");
            }
        })

        //客户端接收消息
        this.$socket.on('receiveMessage',(data)=>{
            /**
             * 监听到事件发生，就显示信息
             */
            _t.showMessage(data);
        })
        //上线通知
        this.$socket.on('connectWarn', data=>{
          console.log(data.username+'上线了')
          this.onlineName = data.username +'上线了'
          this.sd=true;
          setTimeout(()=>{
            this.sd=false;
          },2000)
        })
        //提示下线
        this.$socket.on('disconnectWarn',(data)=>{
            /**
             * 监听到事件发生，就显示信息
             */
            console.log(data.username+'下线了')
            this.onlineName = data.username +'下线了'
            this.sd=true
            setTimeout(()=>{
              this.sd=false;
            },2000)
        })

  },
  methods:{
    login(){
      this.setUsername();
    },
    //启动聊天界面
    beginChat() {
        this.beginChatStatus=true
        alert('登录成功,开始聊天吧')
    },
    //设置用户名，当用户登录的时候触发
    setUsername(){
        //判断用户名是否存在
        if(this.username) {
            this.$socket.emit('login',{"username": this.username}); 
        }
    },
    //发送消息事件
    sendMessage() {
        if(this.chatinput) {
          this.$socket.emit('sendMessage',{username: this.username, message: this.chatinput});
          this.chatinput=''
        }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}
h1,h5{
    text-align: center;
    margin:0;
}
.login {
    text-align: center;
}

#content {
    height: auto;
}
.bottomSend-box{
  position: fixed;
  bottom: 0;
  display: flex;
  height: 3rem;
  align-items: center;
  width: 100%;
  background: #41b883;
  padding:0 1rem;
}
#chatinput{
    width: 80%;
    height: 2rem;
    line-height: 2rem;
    padding: 0;
    border-width: 0;
    outline: none;
}
.bottomSend-box button{
  height: 2rem;
}

.sdbox{
  background: rgba(0,0,0,.3);
  
  z-index: 2;
  line-height: 2.6rem;
  display: inline-block;
  transform: translate(-50%,-50%);
  top:30%;
  left:50%;
  position: fixed;
  color:#fff;
}
.sdanimate-enter-active,.sdanimate-leave-active{
  transition: all 1000ms;
}

.sdanimate-enter {
  left:-100%;
}
.sdanimate-enter-to {
  left:50%;
}
.sdanimate-leave {
  left:50%;
}
.sdanimate-leave-to {
  left:200%;
}
</style>
