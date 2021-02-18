const express = require('express');
const app = new express();


var canvas = require('canvas');
canvas.registerFont('./Alibaba-PuHuiTi-Bold.ttf', {family: 'Alibaba-PuHuiTi-Regular'});
 

 
var posterCook = new (require("./PosterCook.js"))




app.get('/', function(req, res){

  posterCook.cook(req.query).then(img=>{
    res.send(img)
  })
	
})

app.listen(3000,  function(){
	console.log('listening at 3000')
})