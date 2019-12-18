/*
fs.stat 检测是文件还是目录

fs.mkdir  创建目录

fs.writeFile 创建写入文件

fs.appendFile 追加文件

fs.readFile 读取文件

fs.readdir 读取目录

fs.rename  重命名& 剪切

fs.rmdir 删除目录

fs.unlink 删除文件
*/

const fs = require('fs');

// fs.stat('http.js', (err,stats)=>{
//     if(err){
//         console.log(err)
//         return
//     }

//     console.log('文件',stats.isFile())
//     console.log('目录',stats.isDirectory())
// })



/* 2.
fs.mkdir(path, mode, callback)
path 创建的目录
mode 目录权限(读写权限) 默认0777
callback 回调 传递异常参数err
*/

// fs.mkdir('test',function(err){
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('创建文件成功')
// })





/* 3.
fs.writeFile 创建写入文件

filename      (String)            文件名称
data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
options        (Object)           option数组对象，包含：
· encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
· mode         (Number)        文件读写权限，默认值 438
· flag            (String)            默认值 ‘w'
callback {Function}  回调，传递一个异常参数err。
*/
// fs.writeFile('嘿嘿嘿.txt', '123123', function(err){
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log('创建写入文件成功')      
// })



// fs.appendFile('嘿嘿嘿.txt', '123123\n', function(err){
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log('创建写入文件成功')      
// })




// fs.readFile('test.xlsx',(err,data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data.toString())      
// })


// fs.readdir('html',(err,data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data)      
// })







//改名
// fs.rename('html/index.html', 'html/news.html', function(err){
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('改名成功')
// })

//剪切
// fs.rename('index.css', 'html/index.css', function(err){
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('剪切成功')
// })