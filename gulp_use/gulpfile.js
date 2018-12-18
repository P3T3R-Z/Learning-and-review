const gulp = require('gulp'),

	minifyHTML   = require('gulp-minify-html'),
	connect = require('gulp-connect'),
	gulpSequence = require('gulp-sequence'),
	clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),  
	rename = require('gulp-rename'),  
	cleanCss = require('gulp-clean-css'),	
	imagemin = require('gulp-imagemin');
    revAppend = require('gulp-rev-append');

/*	gulp-rev-append插件
	tips: 如果引入的路径为构建的路径，在当前目录下找不到资源的时候该插件无法使用,则修改源码,如下
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


//源文件
const js_src = "src/Public/**/*.js";  
const html_src = "src/*.html"; 
const css_src = "src/**/*.css"
const img_src = ["src/Public/**/*.png", "src/Public/**/*.jpg", "src/Public/**/*.gif"]

// //压缩编译输出目录
// const js_task = "fdist/js"
// const css_task = "fdist/css"
// const img_task = "fdist/image"
// //匹配压缩文件
// const match_js = "fdist/js/**/*.js"
// const match_css = "fdist/css/**/*.css"
// const match_img = ["fdist/**/*.png", "fdist/**/*.jpg", "fdist/**/*.gif"]

//版本处理输出目录
const rev_src = "dist/Public";//版本号文件输出目录
const rev_json_src = 'rev' //版本号文件json目录
const buildBasePath = "dist"  //版本号文件根目录



//清空输出目录
gulp.task('clean:Build', function (cb) {
    return gulp.src(buildBasePath, {read: false})
        .pipe(clean());
});

gulp.task('jstask', function(){
	return gulp.src(js_src)
			.pipe(uglify())       //gulp-uglify压缩
			//.pipe(rename('test.min.js'))  //重命名 方法一
			// .pipe(          //方法二 rename via hash
			// 	rename({             
			// 		dirname: "rename",  //目录名
			// 	    basename: "result",	//文件名
			// 	    prefix: "bonjour-",	//前缀
			// 	    suffix: ".min",   //后缀
			// 	    extname: ".js"    //扩展名
			// 	})
			// )
		    .pipe(gulp.dest(rev_src))
})

gulp.task('csstask', function(){
	return gulp.src(css_src)
		//.pipe(sass().on('error', sass.logError)) //sass 编译
		.pipe(cleanCss())  //css压缩
	    .pipe(gulp.dest(rev_src))
})
 
gulp.task('imagetask', ()=>{
    return gulp.src(img_src)
        .pipe(imagemin([
        	imagemin.gifsicle({interlaced: true}),
    		imagemin.jpegtran({progressive: true}),
        	imagemin.optipng({optimizationLevel:5})
        ]))
        .pipe(gulp.dest(rev_src))
})


gulp.task('revAppend', function() {
  gulp.src(html_src)
    .pipe(revAppend())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload()) //热刷新
});



gulp.task('server', function(){
    connect.server({
    	root: 'dist',
    	livereload: true  //热刷新
    })
})

gulp.task('watch', function(){
    gulp.watch([html_src, js_src, css_src], ['sequenceTask'])
})

gulp.task('default', function(cb){
	gulpSequence('clean:Build','jstask','csstask','imagetask','revAppend','server','watch')(cb)
})

gulp.task('sequenceTask', function(cb){
	gulpSequence('clean:Build','jstask','csstask','imagetask','revAppend')(cb)
})



