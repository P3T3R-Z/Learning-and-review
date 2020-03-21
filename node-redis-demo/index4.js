// hash集合类型
const redis = require("redis"),
  client = redis.createClient(6379, "127.0.0.1");

  //增加一条数据

  client.hset("userinfo","name","zhangsan")
  client.hset("userinfo","age","20")

  client.hgetall("userinfo",(err,res)=>{
      console.log(res)
  })