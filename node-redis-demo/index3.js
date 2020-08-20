// set集合类型
const redis = require("redis"),
  client = redis.createClient(6379, "127.0.0.1");


//   //删除所有数据
//   client.flushall((err,val)=>{
//       console.log(val)
//   })



//设置console.log(res)
client.sadd("slist","123")
client.sadd("slist","aaa")
client.sadd("slist","ccc")
client.sadd("slist","ccc")
client.sadd("slist","ccc123","aaaaat")

//set类型里面的值无法重复
client.smembers("slist", (err,res)=>{
    console.log(res)
})