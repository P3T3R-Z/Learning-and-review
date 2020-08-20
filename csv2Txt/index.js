// csv模块包含以下4个模块
// CSV.generate 生成csv文件
// csv.parse 将csv解析成数组变量
// stream-transform 转换框架
// csv.stringify 记录转csv


const CSV=require('CSV');
let generator=CSV.generate({speed:1,columns:2
	,length:20});
let parser=CSV.parse();
let transformer= CSV.transform(function(data){
	return data.map(value=>{
		return value.toUpperCase()
	});
});
let stringifier=CSV.stringify()
generator.on('readable',function(){
	while(data = generator.read()){
		parser.write(data)
	};
});
// 解析生成csv文件
parser.on('readable',function(){
	while (data= parser.read()){
		transformer.write(data);
	}
});
//将csv文件转换为txt文件
transformer.on('readable',function(){
	while(data = transformer.read()){
		stringifier.write(data)
	}
});

stringifier.on('readable',function(){
	while(data = stringifier.read()){
		process.stdout.write(data)
	}
})
