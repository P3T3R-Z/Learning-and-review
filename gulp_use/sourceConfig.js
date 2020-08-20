const public_path = "src", //源码入口
  assets_path = public_path + "/assets", //静态文件目录
  ignore_path = public_path + "/static", //无需额外处理的文件目录
  build_path = "build", //输出目录
  build_assets_path = build_path+ "/assets",
  build_static_path = build_path+ "/static";
const source = {
  //忽略源
  ignorefile: [`${ignore_path}/*.*`],
  //匹配源
  js_path: [`${assets_path}/**/*.js`, `${assets_path}/*.js`],
  html_path: [`${public_path}/**/*.html`, `${public_path}/*.html`],
  style_path: [
    `${assets_path}/**/*.scss`,
    `${assets_path}/*.scss`,
    `${assets_path}/*.css`,
    `${assets_path}/**/*.css`,
  ],
  img_path: [
    `${assets_path}/**/*.png`,
    `${assets_path}/**/*.jpg`,
    `${assets_path}/**/*.jpeg`,
    `${assets_path}/**/*.gif`,
  ],
  //输出地址
  build_path,
  build_assets_path,
  build_static_path
};

module.exports = source;
