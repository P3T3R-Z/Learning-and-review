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

  return Promise.resolve(`<html style="background:#000">${imgs}</html>`);
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
  var rect = new Konva.Rect({
    fill: "#fff",
    width: mainConfig.width,
    height: mainConfig.height,
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    shadowOpacity: 0.2,
    cornerRadius: 60,
  });
  layer.add(rect);

  let headimgHeight = await drawImage(
    layer,
    "./head.png",
    0,
    ctxHeight,
    mainConfig.width
  );
  ctxHeight += headimgHeight;
  const margin = mainConfig.imgMargin;

  for (let index = 0; index < textstrs.length; index++) {
    const textstr = textstrs[index];
    const imgdata = imgdatas[index];

    let textHeight = drawText(layer, textstr, ctxHeight + margin);

    ctxHeight = ctxHeight + textHeight + margin;

    let imageHeight = await drawCtxImg(
      layer,
      imgdata,
      imgConfig.x,
      ctxHeight + margin,
      imgConfig.width
    );
    ctxHeight = ctxHeight + imageHeight + margin;
  }

  let footimgHeight = await drawImage(
    layer,
    "./foot.png",
    0,
    ctxHeight + margin,
    mainConfig.width
  );
  ctxHeight = ctxHeight + footimgHeight + margin;

  rect.height(ctxHeight);
  stage.height(ctxHeight);

  return new Promise((resolve) => {
    setTimeout(() => {
      layer.draw();
      console.log("ok");
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

function drawImage(layer, imgdata, x = 0, y = 0, width) {
  return new Promise((resolve) => {
    var img = new Konva.window.Image();
    img.onload = function () {
      let aspectRaTio = img.width / img.height;
      let imgHeight = parseFloat((width / aspectRaTio).toFixed(2));

      var image = new Konva.Image({
        image: img,
        height: imgHeight,
        y,
        x,
        width,
      });

      layer.add(image);

      resolve(imgHeight);
    };

    img.src = imgdata;
  });
}
function loadImages(sources, width) {
  return new Promise((resolve) => {
    var img = new Konva.window.Image();
    img.onload = function () {
      let aspectRaTio = img.width / img.height;
      let imgHeight = parseFloat((width / aspectRaTio).toFixed(2));

      resolve({ img, imgHeight });
    };
    img.src = sources;
  });
}

async function drawCtxImg(layer, imgdata, x = 0, y = 0, width) {
  let { img, imgHeight } = await loadImages(imgdata, width);

  var line = new Konva.Line({
    points: [
      x + 20,
      y - 20,

      // x + width / 4,
      // y - 20,

      x + width / 2,
      y - 20,

      // x + width / 2 + width / 4,
      // y - 20,

      x + width - 20,
      y - 20,

      x + width + 20,
      y + 20,

      x + width + 20,
      y + imgHeight / 2,

      x + width + 20,
      y + imgHeight - 20,

      x + width - 20,
      y + imgHeight + 20,

      x + width / 2,
      y + imgHeight + 20,

      x + 20,
      y + imgHeight + 20,

      x - 20,
      y + imgHeight - 20,

      x - 20,
      y + imgHeight / 2,

      x - 20,
      y + 20,
    ],
    closed: true,
    stroke: "#a6d28d",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
    dash: [2, 4],
    tension: 0.4,
  });
  layer.add(line);

  var rect = new Konva.Rect({
    x: x,
    y: y,
    width,
    height: imgHeight,
    cornerRadius: [20, 20, 20, 20],
    fillPatternImage: img,
    fillPriority: "pattern",
  });
  layer.add(rect);
  return Promise.resolve(imgHeight);
}
