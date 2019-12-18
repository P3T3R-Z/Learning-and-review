/*
get post传值获取
 */

var http=require('http');
var url=require('url');
var fs=require("fs")
var ejs =require('ejs')
http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type":"text/html:charset='urf-8'"});//设置http头部

    
    if(req.url!='/favicon.ico'){
       



        if(req.url=='/'){
            console.log(url.parse(req.url, true))                     //get传值
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

        if(req.url=='/login'){
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
        }
        
    }
    
}).listen(3000,()=>console.log(3000))