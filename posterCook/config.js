let mainConfig = {
  srcDir: "src", //入口
  buildDir: "build", //处理后地址
  imgType: [".jpg", ".png"], //图片类型
  watermark: "./static/logo.png", //水印图片
  headImg: "./static/head.png", //头部图片
  footImg: "./static/foot.png", //底部图片
  font: "./static/Alibaba-PuHuiTi-Bold.ttf" , //字体文件


  textSplitSign: /.+[\r\n]*?/g, //文本段落回车符
  textEncoding: "utf-8", //文本编码格式
  

  shadowWidth: 20,
  width: 957, //海报宽度
  height: 1000, //初始高度, 后面会计算实际高度
  fill: "white", //海报颜色

  imgMargin: 60, //图片上下间距


  normalRatio: 3/4,    //正常宽高比
  unNormalRatio: 0.67,  //长图的宽高比

};


let mainBOXConfig = {
  fill: "#fff",          //底色
  width: mainConfig.width,  //内容宽度
  x: mainConfig.shadowWidth,  //内容宽度+阴影宽度
  y: mainConfig.shadowWidth,
  shadowColor: "#006257",      //阴影颜色
  shadowBlur: 10,         //阴影大小
  shadowOffsetX: 3,
  shadowOffsetY: 3,
  shadowOpacity: 0.3,
  cornerRadius: 60,
}


let textConfig = {
  lineHeight: 2, //文字行高
  fontSize: 30, //文字大小 
  fill: "#666", //文字颜色
  width: 794, //文本宽度
  x: 80, //距左边
  
  stroke: '#fff',      //文字描边色
  strokeWidth: 1.3,    //文字描边宽度
  wrap: 'char',        //换行, word , char
  letterSpacing: -2,       //文字间距

  fontFamily: 'Alibaba-PuHuiTi-Regular', //字体
};

let imgConfig = {
  width: 794, //图片宽度
  x: 80, //距左边

  cornerRadius: 20, //图片圆角
  scale: { x: 0.92, y: 0.92 }, //图片与虚线对比后的宽高缩小比例
};

exports.imgConfig = imgConfig;
exports.mainConfig = mainConfig;
exports.textConfig = textConfig;
exports.mainBOXConfig = mainBOXConfig;
