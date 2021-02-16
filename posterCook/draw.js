let { textConfig, mainConfig, imgConfig } = require("./config.js");
const Konva = require("konva-node");
let path = require("path");
let { readstream } = require("./util.js");
module.exports = async function drawPoster(posters) {
  let imgs = "";

  for (let i = 0; i < posters.length; i++) {
    var data = posters[i];

    let dataUrl = await konva_draw(data);
    imgs += `<img src="${dataUrl}" style="display:block;margin:0 auto"/>`;
  }

  return Promise.resolve(imgs);
};

async function konva_draw(data) {
  let textstrs = data.str,
    imgdatas = data.img,
    ctxHeight = 0;

  var stage = new Konva.Stage({
    width: mainConfig.width,
    height: mainConfig.height,
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  let headimgHeight = await drawImage(layer, "./head.png", ctxHeight);
  ctxHeight += headimgHeight;

  for (let index = 0; index < textstrs.length; index++) {
    const textstr = textstrs[index];
    const imgdata = imgdatas[index];

    let textHeight = drawText(layer, textstr, ctxHeight);
    ctxHeight += textHeight;
    let imageHeight = await drawImage(layer, imgdata, ctxHeight);
    ctxHeight += imageHeight;
  }

  let footimgHeight = await drawImage(layer, "./foot.png", ctxHeight);
  ctxHeight += footimgHeight;


  stage.height(ctxHeight);

  return new Promise((resolve) => {
    setTimeout(() => {
      layer.draw();
      console.log('ok')
      stage.toDataURL({
        callback: function (data) {
          resolve(data);
        },
      });
    }, 0);
  });
}

function drawText(layer, textstr, y = 0) {
  var text = new Konva.Text({
    text: textstr,
    ...textConfig,
    y,
  });

  layer.add(text);
  return text.height();
}

function drawImage(layer, imgdata, y = 0) {
  return new Promise((resolve) => {
    var img = new Konva.window.Image();
    img.onload = function () {
      let aspectRaTio = img.width / img.height;
      let imgHeight = parseFloat((imgConfig.width / aspectRaTio).toFixed(2));
      var image = new Konva.Image({
        image: img,
        width: imgConfig.width,
        height: imgHeight,
        y: y,
      });

      layer.add(image);

      resolve(imgHeight);
    };

    img.src = imgdata;
  });
}
