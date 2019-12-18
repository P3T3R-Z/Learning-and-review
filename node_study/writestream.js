const fs=require('fs');
var data="aaaaa\n";

//流的方式写入文件
var ws=fs.createWriteStream('2.txt');





for(var i=0;i<10;i++){
    ws.write(data, 'utf8')

    
}

ws.end()

ws.on("finish", function(){
    console.log("写入完成")
})

ws.on("error", function(){
    console.log("写入失败")
})