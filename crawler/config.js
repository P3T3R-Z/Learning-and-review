
const path=require('path');
const fs = require('fs')
fs.mkdir('./img/s',function(err){
	if(err){
		console.error(err);
	}
		
		console.log('创建目录成功');
});
const imgDir=path.join(__dirname, 'img');

module.exports.imgDir=imgDir;