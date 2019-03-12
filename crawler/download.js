var fs = require('fs');
var request = require("request");
var path = require('path')


for (let i = 0; i <= 71; i++) {
    var src = `https://static.tuokgx.net/customer/src/images/face/${i}.gif`;
    download(src, i)
}


function download(src, name){
    var writeStream = fs.createWriteStream(path.join(path.join(__dirname, 'img'), name+'.gif') ,{'encoding': 'utf8'})
    var readStream = request(src)
    readStream.pipe(writeStream);
    readStream.on('end', function() {
        console.log('文件下载成功');
    });
    readStream.on('error', function() {
        console.log("错误信息:" + err)
    })
    writeStream.on("finish", function() {
        console.log("文件写入成功");
        writeStream.end();
    });
}
