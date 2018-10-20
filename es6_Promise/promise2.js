// Promise还可以做更多的事情，
// 比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。
//要  串行执行  这样的异步任务，不用Promise需要写一层一层的嵌套代码。有了Promise，我们只需要简单地写：


//串行执行
//job1.then(job2).then(job3).catch(handleError);


//Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象
/*例:
 var p = Promise.resolve(123)
p.then(res=>{
	console.log(res)    //返回123
})*/


var job1 = new Promise((resolve,reject)=>{
	console.log('job1完成')
	resolve(1)
})
function job2(num){
	// return new Promise((resolve,reject)=>{
	// 	console.log('job2完成')
	// 	resolve(num+num)
	// })
	console.log('job2完成')
	return Promise.resolve(num+num)
}

function job3(num){
	return new Promise((resolve,reject)=>{
		console.log('job3完成')
		resolve(num+3)
	})
}


job1.then(job2).then(job3).then(function(result){
	console.log('最后结果为:',result)
}).catch(error=>{
	console.log('失败结果为', error)
})