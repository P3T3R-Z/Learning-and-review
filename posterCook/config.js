let mainConfig = {
  srcDir: "src", //入口
  buildDir: "build", //处理后地址
  imgType: [".jpg", ".png"], //图片类型
  watermark: "./logo.png", //水印图片
  headImg: "./head.png", //头部图片
  footImg: "./foot.png", //底部图片



  textSplitSign: /.+[\r\n]*?/g, //文本段落回车符
  textEncoding: "utf-8", //文本编码格式

  width: 957, //海报宽度
  height: 1000, //初始高度, 后面会计算实际高度
  fill: "white", //海报颜色

  imgMargin: 60,
};

let textConfig = {
  lineHeight: 2, //文字行高
  fontSize: 30, //文字大小 
  fill: "#686868", //文字颜色
  width: 794, //文本宽度
  x: 80, //距左边
  fontFamily: "'Alibaba-PuHuiTi-Regular'",
  stroke: '#fff',
  strokeWidth: 1
};

let imgConfig = {
  width: 794, //图片宽度
  x: 80, //距左边

  cornerRadius: 20, //图片圆角
  scale: { x: 0.92, y: 0.95 }, //图片与虚线对比后的宽高缩小比例
};

exports.imgConfig = imgConfig;
exports.mainConfig = mainConfig;
exports.textConfig = textConfig;
