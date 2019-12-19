/*
get post传值获取
 */

var http=require('http');
var url=require('url');
var fs=require("fs")
var ejs =require('ejs')

var path=require('path');
var url=require('url')
var getmime = require('./demo/getmime');


http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type":"text/html:charset='urf-8'"});//设置http头部

    var pathname=url.parse(req.url).pathname; //去除参数
    if(pathname!='/favicon.ico'){
       



        if(pathname=='/'){
            console.log(url.parse(pathname, true))                     //get传值
            res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"})
            var emojidata=fs.readFileSync('1.txt');
            ejs.renderFile('./index.html',{list:[1,2,3],emojidata},(error,data)=>{
                
                
               
                //res.write(data+"<div>"+emojidata.toString()+"</div>")
            
               res.write(data)
                res.end()
            })

            // fs.readFile('./index.html', (error,data)=>{
            //     res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"})
            //     res.write(data)
            //     res.end()
            // })
        }

       else if(pathname=='/login'){
            let postData=''                     //post传值
            req.on( 'data',  function (postDataChunk) {
            postData += postDataChunk;
            });
            // 数据接收完毕，执行回调函数
            req.on( 'end',  function () {
            try {
                postData =  JSON.parse(postData);
            }  catch (e) { }
                console.log( postData);
            });
        } else {


              //获取文件的后缀
                var endname=path.extname(pathname);
                //获取文件类型
                var filetype=getmime.extname(endname)
             
                fs.readFile('./'+pathname, (err,data)=>{
                    if(err){
                    
                        console.log(err)
                        res.end()
                       return
                    }else{
                        res.writeHead(200,{"Content-Type":filetype+";charset='utf-8'"})
                        res.write(data)
                        res.end()
                    }

                })

        }
        
      
        
    }
    
}).listen(3000,()=>console.log(3000))