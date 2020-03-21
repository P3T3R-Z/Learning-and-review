
/*

https://www.npmjs.com/package/redis

*/

var redis = require("redis"),
    client = redis.createClient(6379,'127.0.0.1');

    //发送消息  广播

    client.publish('sendServer01', 'this is news info');

    
    client.publish('sendServer02', 'this is product info');