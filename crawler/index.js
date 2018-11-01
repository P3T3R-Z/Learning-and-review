//index.js
const request= require('request');
const path=require('path');
const analyze = require('./analyze');
const config = require('./config');
const fs = require('fs')


function start(crawledPath) {
	request(crawledPath, function(err, res, body) {
		
		if(!err && res){
			console.log('start');
			analyze.findImg(body, downLoad);
		}
	})
}
//抓取图片后的回调函数
function downLoad(imgUrl, i) {
	let ext = imgUrl.split('.').pop();
	//console.log('后缀名',ext)
	//console.log(imgUrl)
	request(imgUrl).pipe(fs.createWriteStream(path.join(config.imgDir, i+'.jpg') ,{'encoding': 'utf8'}))
	console.log('已抓取图片'+i+'个');
}

//爬取的地址
const crawledPath="http://loftermeirenzhi.lofter.com/tag/%E4%BA%BA%E5%83%8F?page=";
start(crawledPath)