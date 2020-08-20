var http=require('http');

var fs =require('fs')

var path=require('path');
var url=require('url')
var getmime = require('./getmime')

http.createServer((req,res)=>{

    res.writeHead(200, {"Content-Type":"text/html:charset='utf-8'"})

    var pathname=url.parse(req.url).pathname; //去除参数

    if(pathname=='/'||pathname=="/index"){ //首页

        pathname='/index.html'
    }

    //获取文件的后缀
    var endname=path.extname(pathname);
   //获取文件类型
   var filetype=getmime.extname(endname)


    if(pathname!='/favicon.ico'){ //静态文件
 
        fs.readFile('static'+pathname, (err,data)=>{
            if(err){
               
                console.log(err)
                fs.readFile('static/404.html', (error,data404)=>{
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"})
                    res.write(data404)
                    res.end()
                })
            }else{
                res.writeHead(200,{"Content-Type":filetype+";charset='utf-8'"})
                res.write(data)
                res.end()
            }

        })
    }

}).listen(3000, ()=>{
    console.log('listen 3000')
})