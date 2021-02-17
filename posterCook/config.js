let mainConfig = {
  srcDir: "src", //入口
  buildDir: "build", //处理后地址
  imgType: [".jpg", ".png"], //图片类型
  watermark: "./logo.png", //水印图片

  textSplitSign: /.+[\r\n]*?/g,
  textEncoding: "utf-8",

  width: 957, //海报宽度
  height: 1000, //初始高度, 后面会计算实际高度
  fill: "white", //海报颜色

  imgMargin: 60,
};

exports.mainConfig = mainConfig;

let textConfig = {
  lineHeight: 2, //文字行高
  fontSize: 30, //文字大小
  fontFamily: "sans-serif", //字体
  fill: "#686868", //文字颜色
  width: 794, //文本宽度
  x: 80, //距左边
};

exports.textConfig = textConfig;

let imgConfig = {
  width: 730, //图片宽度
  x: 113, //距左边
};

exports.imgConfig = imgConfig;