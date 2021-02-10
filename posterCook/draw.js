let cookText = require("./cookText");
let { textConfig, mainConfig, imgConfig } = require("./config.js");
const Konva = require("konva-node");
let path = require("path")
 
module.exports = async function drawPoster(posters) {
  let imgs = "";

  for (let i = 0; i < posters.length; i++) {
    var data = posters[i];

    let dataUrl = await konva_draw(data);
    imgs += `<img src="${dataUrl}" />`;
  }

  return Promise.resolve(imgs);
};

function konva_draw(data) {
  let str = data.str[0],
    imgdata = data.img[0];

  

  var stage = new Konva.Stage({
    width: mainConfig.width,
    height: mainConfig.height,
  });



  var layer = new Konva.Layer();
  stage.add(layer);




  var text = new Konva.Text({
    text: str,
    ...textConfig,
  });
  
  let textHeight = text.height();
  layer.add(text)


  var img = new Konva.window.Image();
  img.onload = function(){
    console.log(img.height)
    var image = new Konva.Image({
      image: img,
      width: imgConfig.width,
      height: "auto"
    });

    layer.add(image)
    console.log(2)
  }
 

  img.src =  imgdata //'https://konvajs.org/css/images/logo.png'//
 
  // stage.height(textHeight)
 

  return new Promise((resolve) => {
    setTimeout(()=>{
      console.log(1)
      layer.draw();
    stage.toDataURL({
      callback: function (data) {
        resolve(data);
      },
    });
    }, 0)
    
  });
}
