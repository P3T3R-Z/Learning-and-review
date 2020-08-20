//promise函数
function log(x){
    console.log(x)
}
function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    log('初始数值为: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            log('执行true');
            resolve(timeOut);
        }
        else {
            log('执行false');
            reject(timeOut);
        }
    }, timeOut * 1000);
}
// 这个test()函数有两个参数，这两个参数都是函数，如果执行成功，我们将调用resolve()，
// 如果执行失败，我们将调用reject()。
// 可以看出，test()函数只关心自身的逻辑，并不关心具体的resolve和reject将如何处理结果
var p1 = new Promise(test);
// 如果成功，执行这个函数
var p2 = p1.then(function (result) {
    console.log('promise返回结果为成功情况：' + result);
});
//失败执行
var p3 = p2.catch(function (error) {
    console.log('promise返回结果为失败情况：' + error);
});

//可见Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了：
