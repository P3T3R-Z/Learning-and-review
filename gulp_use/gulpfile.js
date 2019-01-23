const source = require("./sourceConfig");

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  connect = require("gulp-connect"),
  gulpSequence = require("gulp-sequence"),
  changed = require("gulp-changed"),//筛选出修改过的资源
  clean = require("gulp-clean"),
  uglify = require("gulp-uglify"),
  //rename = require("gulp-rename"),
  cleanCss = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  revAppend = require("gulp-rev-append"), //html引入文件添加hash后缀 用法`?rev=@@hash`
  gutil = require("gulp-util"), //日志打印
  babel = require("gulp-babel"); //es6转换插件, 此环境该插件必须为7.0.0

/*	gulp-rev-append插件bugfix
	try {
	 data = fs.readFileSync(dependencyPath);
	 hash = crypto.createHash('md5');
	 hash.update(data.toString(), 'utf8');
	  var _rev=new Date().getTime();
	  line = line.replace(groups[2], _rev);
	}catch(e){
		var _rev=new Date().getTime();
   		line = line.replace(groups[2], _rev);
	}
   
*/

//清空build目录
gulp.task("clean:build", function(cb) {
  return gulp
    .src(source.build_src, {
      read: false
    })
    .pipe(clean());
});

gulp.task("jstask", function() {
  return (
    gulp
      .src([...source.ignore, ...source.js_src])
      .pipe(
        changed(source.build_src, {
          extension: ".js"
        })
      )
      .pipe(
        babel({
          presets: ["es2015"]
        })
      )
      .pipe(uglify())
      // .pipe(
      //   rename({
      //     //dirname: "",  //目录名
      //     //  basename: "",	//文件名
      //     //  prefix: "",	//前缀
      //     //suffix: ".min", //后缀
      //     extname: ".js" //扩展名
      //   })
      // )
      .on("error", function(err) {
        gutil.log(gutil.colors.red("[Error]"), err.toString());
      })
      .pipe(gulp.dest(source.build_src))
  );
});

gulp.task("csstask", function() {
  return (
    gulp
      .src([...source.ignore, ...source.scss_src])
      
      .pipe(
        changed(source.build_src, {
          extension: ".css"
        })
      )
      .pipe(sass().on("error", sass.logError)) //sass 编译
      .pipe(cleanCss()) //css压缩
      // .pipe(
      //   rename({
      //     //dirname: "",  //目录名
      //     //  basename: "",	//文件名
      //     //  prefix: "",	//前缀
      //     //suffix: ".min", //后缀
      //     extname: ".css" //扩展名
      //   })
      // )
      .pipe(gulp.dest(source.build_src))
  );
});

gulp.task("imagetask", () => {
  return (
    gulp
      .src(source.img_src)
      .pipe(changed(source.build_src))
      .pipe(
        imagemin([
          imagemin.gifsicle({
            interlaced: true
          }),
          imagemin.jpegtran({
            progressive: true
          }),
          imagemin.optipng({
            optimizationLevel: 5
          })
        ])
      )
      .pipe(gulp.dest(source.build_src))
  );
});


//添加版本后缀
gulp.task("revAppend", function() {
  gulp
    .src([...source.html_src])
    .pipe(revAppend())
    .pipe(gulp.dest(source.build_src))
    .pipe(connect.reload()); //热刷新
});

gulp.task("reload", function() {
  gulp
    .src([...source.html_src])
    .pipe(gulp.dest(source.build_src))
    .pipe(connect.reload()); //热刷新
});

gulp.task("server", function() {
  connect.server({
    root: source.build_src,
    livereload: true //热刷新
  });
});


gulp.task("watch", function() {
  w([...source.ignore, ...source.scss_src], ["csstask", "revAppend"]);
  w([...source.ignore, ...source.js_src], ["jstask", "revAppend"]);
  w([...source.img_src], ["imagetask","reload"])
  w([source.html_src], ["reload"]);
  function w(path, taskname) {
    gulp.watch(path, taskname);
  }
});

gulp.task("default", function(cb) {
  gulpSequence(
    "clean:build",
    "imagetask",
    "jstask",
    "csstask",
    "revAppend",
    "server",
    "watch"
  )(cb);
});

gulp.task("sequenceTask", function(cb) {
  gulpSequence("jstask", "csstask", "revAppend")(cb);
});
