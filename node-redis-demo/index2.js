// list类型
const redis = require("redis"),
  client = redis.createClient(6379, "127.0.0.1");

  //设置值
//   client.rpush("userlist","张三")
//   client.rpush("userlist","李四")
//   client.rpush("userlist","aaa")
//   client.rpush("userlist","bbb")
//删除值
  client.rpop("userlist")
  client.lrange("userlist",0,-1, (err,res)=>{
      if(err){
          console.log(err)
          return
      }

      console.log(res)
  })