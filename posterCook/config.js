let config = {
  srcDir: "src", //入口
  buildDir: "build", //处理后地址
  imgType: [".jpg", ".png"], //图片类型
  watermark: "./logo.png", //水印图片

  lineheight: "22", //文字行高
  lineTextLength: "30", //文字每行字数
  fontSize: "16px", //文字大小
  fontFamily:
    "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif", //字体
  fontColor: "#000", //文字颜色

  textSplitSign: /.+[\r\n]*?/g,
  textEncoding: "utf-8",
};

module.exports = config;
