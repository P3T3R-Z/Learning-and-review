//redis string类型读删

const redis = require("redis"),
  client = redis.createClient(6379, "127.0.0.1");

  client.get("name", (err, res)=>{
      if(err){
          console.log(err)
          return
      }
      console.log(res)
  })


  client.del("name", (err, res)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(res)
})
