//events模块 实例化EventEmitter来绑定和监听事件
//nodejs事件驱动

var events=require('events');



var EventEmitter=new events.EventEmitter()

//广播和结束广播

EventEmitter.on('to_parent', function(data){
    console.log("接收广播事件",data)
})


setTimeout(()=>{
    console.log('开始广播')
    //广播to_parent事件
    EventEmitter.emit("to_parent", '123123')

},2000)