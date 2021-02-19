

var posterCook = new (require("./PosterCook.js"))();

posterCook.cook().then((img) => {});

// const express = require('express');
// const app = new express();
// app.get('/', function(req, res){

//   posterCook.cook(req.query).then(img=>{
//     res.send(img)
//   })

// })

// app.listen(3000,  function(){
// 	console.log('listening at 3000')
// })
