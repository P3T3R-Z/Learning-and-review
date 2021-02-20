var posterCook = new (require("./PosterCook.js"))();
console.log(process.argv);

if(process.argv[2] == 'water'){
    posterCook.watermark()    //水印
} else {
    posterCook.cook()         //卡片
}









// const express = require('express');
// const app = new express();
// app.get('/', function(req, res){

//   posterCook.cook().then(img=>{
//     res.send(img)
//   })

// })

// app.listen(3000,  function(){
// 	console.log('listening at 3000')
// })
