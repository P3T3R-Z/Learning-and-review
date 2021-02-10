const Jimp = require("jimp");
const { srcDir, buildDir, watermark } = require("./config.js").mainConfig;
// 水印距离右下角百分比
// const LOGO_MARGIN_PERCENTAGE = 5 / 100;

const build = async (ORIGINAL_IMAGE, LOGO) => {
  const [image, logo] = await Promise.all([
    Jimp.read(ORIGINAL_IMAGE),
    Jimp.read(LOGO),
  ]);

  // 将 logo 等比缩小 10 倍
  // logo.resize(image.bitmap.width / 8, Jimp.AUTO);
  logo.resize(logo.bitmap.width * 2, Jimp.AUTO);
  // const xMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE;
  // const yMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE;

  const X = logo.bitmap.width * 1.2; //image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height * 4.2; //logo.bitmap.height - yMargin;

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
      const FILENAME = ORIGINAL_IMAGE.replace(srcDir, buildDir);
      return image.write(FILENAME, (err) => {
        if (err) {
          return console.error(err);
        }
        resolve(image.getBase64Async("image/png"));
      });
    });
  });
};
