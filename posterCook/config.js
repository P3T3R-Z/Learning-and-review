let mainConfig = {
  srcDir: "src", //入口
  buildDir: "build", //处理后地址
  imgType: [".jpg", ".png"], //图片类型
  watermark: "./logo.png", //水印图片

  textSplitSign: /.+[\r\n]*?/g,
  textEncoding: "utf-8",

  width: 320, //海报宽度
  height: 568, //初始高度, 后面会计算实际高度
  fill: "white", //海报颜色
};

exports.mainConfig = mainConfig;

let textConfig = {
  lineHeight: 1.2, //文字行高
  fontSize: 16, //文字大小
  fontFamily: "sans-serif", //字体
  fill: "#999", //文字颜色
  width: mainConfig.width,
  height: "auto",
};

exports.textConfig = textConfig;

let imgConfig = {
  width: mainConfig.width,
  x: 0
};

exports.imgConfig = imgConfig;