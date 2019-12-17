var fs=require('fs')
//1.判断服务器上有没有upload目录,没有创建这个目录

// fs.stat('upload', function(err, stats){
//     if(err){
//         fs.mkdir('upload', function(error){
//             if(error){
//                 console.log(error)
//                 return 
//             }
//             console.log('创建成功')
//         })
//         return
//     }

//     console.log('目录存在->',stats.isDirectory())
// })




//2. 找出目录下所有目录,打印出来
function getfile(file){
    return new Promise(resolve=>{
        fs.stat(file, (err,stats)=>{
            resolve(stats)
        })
    })
}

fs.readdir('html', (err,data)=>{
    if(err){
       console.log(err)
        return
    }
    var alldirsctory=[]
    data.forEach(async (i,k)=>{
        var d=await getfile('html/'+i)
        if(d.isDirectory()){
            alldirsctory.push('html/'+i)
        }
        if(k==data.length-1){
            console.log(alldirsctory)
        }
    })
    
})