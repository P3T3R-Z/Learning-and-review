const fs=require('fs');

//流的方式读取文件
var readstream=fs.createReadStream('1.txt');


var str='', count=0

readstream.on('data', function(chunk){
    str+=chunk;
    count++
})

readstream.on('end', function(){
    console.log(str, count)
})
readstream.on('err', function(err){
    console.log(err)
})