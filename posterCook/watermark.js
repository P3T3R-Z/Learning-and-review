const Jimp = require("jimp");
const { bitmap } = require("_jimp@0.16.1@jimp");
const {
  mainConfig: { srcDir, buildDir, watermark, unNormalRatio, normalRatio },
  imgConfig: { width },
} = require("./config.js");

// 水印距离右下角百分比
// const LOGO_MARGIN_PERCENTAGE = 5 / 100;

const build = async (ORIGINAL_IMAGE, LOGO) => {
  const [image, logo] = await Promise.all([
    Jimp.read(ORIGINAL_IMAGE),
    Jimp.read(LOGO),
  ]);

  // 将 logo 等比缩小 0.8
  logo.resize(logo.bitmap.width*0.8, Jimp.AUTO);
  //原图缩小
  image.resize(width, Jimp.AUTO);



  //===================================处理竖长图, 裁剪4:3图片
  let iheight = image.bitmap.height;
  let iwidth = image.bitmap.width;
  if(iwidth < iheight && (iwidth / iheight).toFixed(2) == unNormalRatio){
 
    let new_iheight = iwidth / normalRatio  //3:4后的新高度
  
    // .crop(x坐标起点, y坐标起点, width最终图片宽度, height最终图片高度)
    //裁剪顶部多余图片
    image.crop(0, iheight - new_iheight, iwidth, new_iheight)
  }
  



  const X = logo.bitmap.width*0.8; //image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height * 3; //logo.bitmap.height - yMargin;

  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.1,
      opacityDest: 1,
    },
  ]);
};

/**
 * @param ORIGINAL_IMAGE {string} 处理图片
 * **/
module.exports = function (ORIGINAL_IMAGE) {
  return new Promise((resolve) => {
    build(ORIGINAL_IMAGE, watermark).then((image) => {
      //水印文件写入
      // const FILENAME = ORIGINAL_IMAGE.replace(srcDir, buildDir);
      // image.write(FILENAME, (err) => {
      //   if (err) {
      //     return console.error(err);
      //   }
      //   resolve(image.getBase64Async("image/png"));
      // });
      resolve(image.getBase64Async("image/png"));
    });
  });
};
