//Promise  并行执行异步任务

//promise.all([]).then()     同时执行 多个异步
var p1 = new Promise((resolve,reject)=>{
	resolve(1)
})

var p2 = new Promise((resolve,reject)=>{
	resolve(2)
})
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); //返回[1, 2]
});



//promise.race([]).then()    只执行 先执行的异步
var p3 = new Promise((resolve,reject)=>{
	setTimeout(resolve, 500 , '3')  //500ms后执行
})

var p4 = new Promise((resolve,reject)=>{
	setTimeout(resolve, 600 , '4')   //600ms后执行
})
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p3, p4]).then(function (results) {
    console.log(results); //返回[3 ,4]
});