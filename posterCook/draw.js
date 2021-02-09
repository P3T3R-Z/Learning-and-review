let cookText = require("./cookText");
var { createCanvas, loadImage } = require("canvas");

module.exports = function drawPoster(posters) {
  let imgs = "";

  for (let i = 0; i < posters.length; i++) {
    var data = posters[i];

    var canvas = createCanvas(320, 568);
    var ctx = canvas.getContext("2d");

    cookText(ctx, data.str[0]);

    let dataUrl = canvas.toDataURL();

    imgs += `<img src="${dataUrl}" />`;
  }

  return Promise.resolve(imgs);
};
