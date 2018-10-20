/*await是等待的意思，那么它等待什么呢，它后面跟着什么呢？
其实它后面可以放任何表达式，
不过我们更多的是放一个返回promise 对象的表达式。
注意await 关键字只能放到async 函数里面*/

//例子

function await1(x){
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, 500, x)
	})
}
async function bigF1(){
	let result1 = await await1('我是等待函数1')
	return result1
}
console.log(2)
async function bigF2(){
	let result1 = await await1('我是等待函数1')
	let result2 = await await1('我是等待函数2')
	let result3 = await await1('我是等待函数3')
	return result1+'/'+result2+'/'+result3
}
bigF1().then(res=>{
	console.log(res)
})
bigF2().then(res=>{
	console.log(res)
})


//结果为
// 2               //因为async为异步函数,不阻塞后续函数
// 我是等待函数1     //这是await等待函数
// 我是等待函数1/我是等待函数2/我是等待函数3    //await等待函数必须执行完后才会继续执行之后的函数



//结论: 在async异步函数中试用await可以很好的同步操作, 避免回调地狱