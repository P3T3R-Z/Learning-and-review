/**
 *
 * @param fn
 * @returns {function(): function()}
 */
function curry(fn) {
    var args = [], // 装总的参数的数组
        n = fn.length; //传入的函数的参数个数
    return function core() { //返回一个接任意个参数的函数
      var arg = [].slice.call(arguments); //获取当前函数的参数
      args = args.concat(arg);
      n -= arg.length;
      return n === 0 ? fn.apply(null, args) : core;
    }
  }
   
  //使用如下
  var add4 = curry(function (a, b, c, d) {
    return a + b + c + d;
  });
  console.log(add4(1, 2)(2)(3));




   
const curry = (fn, n = fn.length, args = []) => n === 0 ? fn(...args) : (...args1) => curry(fn, n - args1.length, [...args, ...args1]);
 
//举例
const add5 = curry((a, b, c, d, e) => a + b + c + d + e);
 
console.log(add5(1, 2)(3, 4)(5));