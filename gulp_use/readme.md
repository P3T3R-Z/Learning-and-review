#### gulpfile2用的是 gulp-rev gulp-rev-collector控制版本 格式为/xx/xx-hash.js
#### gulpfile用的是 gulp-rev-append控制版本 格式为?rev=hash  

gulpfile中添加了gulp-babel插件,用于es6转换,高版本会与babel-cli有冲突,建议为 ^7.0.0, 详见package.json
