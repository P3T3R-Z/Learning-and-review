const gulp = require('gulp'),

	minifyHTML   = require('gulp-minify-html'),
	connect = require('gulp-connect'),
	gulpSequence = require('gulp-sequence'),
	clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),  
	rename = require('gulp-rename'),  
	cleanCss = require('gulp-clean-css'),	
	imagemin = require('gulp-imagemin'),
    revAppend = require('gulp-rev-append'),
    gutil = require('gulp-util'), //日志打印
    babel = require('gulp-babel'); //es6转换插件, 该插件版本详见package.json

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
const js_src = ["src/**/*.js"];  
const html_src = ["views/**/*.html"]; 
const css_src = "src/**/*.css"
const img_src = ["src/**/*.png", "src/**/*.jpg", "src/**/*.gif"]



//版本处理输出目录
const rev_src = "Public";//版本号文件输出目录
const views_src = "Application"
const buildBasePath = "Public"  //版本号文件根目录



//清空输出目录
gulp.task('clean:Build', function (cb) {
    return gulp.src(buildBasePath, {read: false})
        .pipe(clean());
});

gulp.task('jstask', function(){
	return gulp.src(js_src)
			.pipe(babel({
	            presets: ['es2015']
	        }))
            .pipe(uglify())
            .on('error', function (err) {
                gutil.log(gutil.colors.red('[Error]'), err.toString());
            })

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
    .pipe(gulp.dest(views_src))
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
	gulpSequence('clean:Build','jstask','csstask','revAppend','server','watch')(cb)
})

gulp.task('sequenceTask', function(cb){
	gulpSequence('clean:Build','jstask','csstask','revAppend')(cb)
})



