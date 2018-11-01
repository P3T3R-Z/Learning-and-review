//analyze
const cheerio =require('cheerio');

function findImg(dom, callback){
	let $= cheerio.load(dom);
	$('img').each(function(i, elem) {
		let imgSrc= $(this).attr('src');
		console.log('图片地址->'+imgSrc)
		callback(imgSrc, i);
	})
}

module.exports.findImg= findImg;