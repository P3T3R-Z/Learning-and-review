//原型式继承
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
//ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

/*
缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
*/

function P(){this.name=[1,2,3]}
var p = new P()
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
var c = createObj(p)
c.name.push(4)
c.name //[1,2,3,4]
var c2=createObj(p)
c2.name//[1,2,3,4]