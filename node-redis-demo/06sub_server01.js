
/*

https://www.npmjs.com/package/redis

*/

var redis = require("redis"),
    client = redis.createClient(6379,'127.0.0.1');

    //监听广播
    client.subscribe('sendServer01');



    client.subscribe('sendServer02');

    client.on('message',(channel,msg)=>{


        console.log(channel,msg)
    })