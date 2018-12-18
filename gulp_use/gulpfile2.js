const gulp = require('gulp'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	minifyHTML   = require('gulp-minify-html'),
	connect = require('gulp-connect'),
	gulpSequence = require('gulp-sequence'),
	clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),  
	rename = require('gulp-rename'),  
	cleanCss = require('gulp-clean-css'),	
	imagemin = require('gulp-imagemin');



//源文件
const js_src = "src/Public/**/*.js";  
const html_src = "src/*.html"; 
const css_src = "src/**/*.css"
const img_src = ["src/Public/**/*.png", "src/Public/**/*.jpg", "src/Public/**/*.gif"]

//压缩编译输出目录
const js_task = "fdist/js"
const css_task = "fdist/css"
const img_task = "fdist/image"
//匹配压缩文件
const match_js = "fdist/js/**/*.js"
const match_css = "fdist/css/**/*.css"
const match_img = ["fdist/**/*.png", "fdist/**/*.jpg", "fdist/**/*.gif"]

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
		    .pipe(gulp.dest(js_task))
})

gulp.task('csstask', function(){
	return gulp.src(css_src)
		//.pipe(sass().on('error', sass.logError)) //sass 编译
		.pipe(cleanCss())  //css压缩
	    .pipe(gulp.dest(css_task))
})
 
gulp.task('imagetask', ()=>{
    return gulp.src(img_src)
        .pipe(imagemin([
        	imagemin.gifsicle({interlaced: true}),
    		imagemin.jpegtran({progressive: true}),
        	imagemin.optipng({optimizationLevel:5})
        ]))
        .pipe(gulp.dest(img_task))
})




//创建版本后缀
gulp.task('buildRev', function () {
    return gulp.src([match_js, match_css])
        .pipe(rev())
        .pipe(gulp.dest(rev_src)) 
        .pipe( rev.manifest() )
        .pipe( gulp.dest( rev_json_src ) );  
});


gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', html_src])
        .pipe( revCollector({
            replaceReved: false
        }) )
        // .pipe( minifyHTML({
        //         empty:true,
        //         spare:true
        //     }) )
        .pipe( gulp.dest('dist') )
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
	gulpSequence('clean:Build','jstask','csstask','imagetask','buildRev','rev','server','watch')(cb)
})

gulp.task('sequenceTask', function(cb){
	gulpSequence('clean:Build','jstask','csstask','imagetask','buildRev','rev')(cb)
})



