//node http模块
var http=require('http');


var url =require('url')
var fs = require('fs')
var str=require('./config.js').str
/*
req 获取request请求信息
res 获取反应数据
*/
http.createServer((req, res)=>{


    res.writeHead(200, {"Content-Type":"text/html:charset='urf-8'"});//设置http头部

    // if(req.url!='/favicon.ico'){
       

    //     var data = url.parse(req.url, true)  //第二个参数true时,把get传值转换为对象
       
    //    res.write(data.query.aid||str)
    // }

    
    var data=fs.readFileSync('2.txt')
    res.write(data.toString())
    res.end()//结束响应
}).listen(8001,()=>{
    console.log('服务监听:8001')
})



/*
npm -g install supervisor   修改代码自动重启服务

supervisor xx.js
*/