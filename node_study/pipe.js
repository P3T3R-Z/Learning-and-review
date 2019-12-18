var fs=require('fs');

//创建可读流
var readstream=fs.createReadStream('1.txt');


//创建可写流
var writestream=fs.createWriteStream('2.txt');


//管道读写

readstream.pipe(writestream)
readstream.pipe(writestream)
readstream.pipe(writestream)
console.log("管道读写完成")