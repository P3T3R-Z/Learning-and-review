const express = require('express');
const app = new express();

 

 
var posterCook = new (require("./PosterCook.js"))




app.get('/', function(req, res){
 
  posterCook.cook().then(img=>{
    res.send(img)
  })
	
})

app.listen(3000,  function(){
	console.log('listening at 3000')
})