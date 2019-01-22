const static_src = "src", //源目录
  build_src = "build"; //输出目录
const source = {
  //忽略
  ignore: [`!${static_src}/_*.scss`],
  //匹配源
  js_src: [`${static_src}/**/*.js`, `${static_src}/*.js`],
  html_src: [`${static_src}/**/*.html`, `${static_src}/*.html`],
  scss_src: [
    `${static_src}/**/*.scss`,
    `${static_src}/*.scss`,
    `${static_src}/*.css`,
    `${static_src}/**/*.css`
  ],
  img_src: [
    `${static_src}/**/*.png`,
    `${static_src}/**/*.jpg`,
    `${static_src}/**/*.gif`
  ],
  //输出根地址
  build_src: build_src
};

module.exports = source;
