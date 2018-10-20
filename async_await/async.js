//async await函数


/*先说一下async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，
因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行。 写一个async 函数*/

async function firstF(){
	return '我是异步执行的'
}

console.log(firstF())  //查看该函数,返回promise对象
//async 函数返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法，
firstF().then(res=>{
	console.log(res)
})

console.log('后执行')


//async函数为异步执行,没有阻塞后续函数,所以结果为
// Promise{'我是异步执行'}
// 后执行
// 我是异步执行




//async函数成功和抛出异常
async function b(flag){
	if(flag){
		return 'success'
	} else {
		throw  'error'
	}
}
b(false).then(res=>{
	console.log(res)
}).catch(err=>{
	console.log(err)
})