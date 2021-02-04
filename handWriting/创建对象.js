

//Object.create语法
//Object.create(proto, [propertiesObject])      方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。

/*
proto : 必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。
该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
3 返回值：
在指定原型对象上添加新属性后的对象。

*/

//以对象创建
var a = {  rep : 'apple' }
var b = Object.create(a)
b.rep //apple
b.__proto__ //{rep:"apple"}
b //{}


//设置属性值
var o = Object.create({}, { p: { value: 42 } }) //{p:42}
o.p =24 //省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p //所以还是42

//若设置属性描述符
var o = Object.create({}, { p: { value: 42,configurable:true,writable:true,enumerable:true } })
o.p=1
o.p //1
for (var prop in o) {
    console.log(prop) //p
 }
delete o.p //true
o //{}



//Object.setPrototypeOf
/*
描述：该方法的作用与 __proto__ 相同，用来设置一个对象的 prototype 对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
格式：Object.setPrototypeOf(object, prototype)
*/

var proto = {
    y: 20,
    z: 40
};
var o = { x: 10 };
Object.setPrototypeOf(o, proto);
o //{x:10}
o.__proto__ //{y:20, z:40}


//Object.getPrototypeOf(obj)  用于读取一个对象的原型对象


//Object.getOwnPropertyDescriptors(obj)  获取可枚举属性


//原型属性继承

/*
这里结合一个例子来说说这几个方法的使用：
场景：拷贝一个构造函数的实例。
*/

var triangle = {a: 1, b: 2, c: 3};

function ColoredTriangle() {
  this.color = 'red';
}
Object.assign(ColoredTriangle.prototype, triangle)
var c = new ColoredTriangle();
c//{color:'red'}
c.__proto__ //{a:1, b:2, c:3}

var c2 = Object.assign({},c)
console.log(c2.color); //red
console.log(c2.a); //undefined  //因为 Object.assign 是不能拷贝到继承或原型上的方法的。所以 实例c2 没有 a 这个属性



//继承原型的方法
//方法1. 
var originProto = Object.getPrototypeOf(c);
var originProto2 = Object.create(originProto);
var c2 = Object.assign(originProto2, c);  //先获取原型,在合并对象
//var c2 = Object.assign(Object.create(Object.getPrototypeOf(c)), c)  //根据原型创建对象,再合并

console.log(c2.color); // red
console.log(c2.a); // 1



//方法2（推荐）
var c = new ColoredTriangle();
var c2 = Object.create(Object.getPrototypeOf(c), Object.getOwnPropertyDescriptors(c));

console.log(c2.color); // red
console.log(c2.a); // 1

//为什么说推荐这个方法呢？因为Object.assign() 方法不能正确拷贝 get ，set 属性。
//例如 们给 c 实例添加一个 "colorGet" 属性，并设置该属性的get 描述符
var c = new ColoredTriangle();
Object.defineProperty(c,'colorGet', {
    enumerable: true, // 设为可枚举，不然 Object.assign 方法会过滤该属性
    get(){
        return "Could it return " + this.color
    }
});

var c3 = Object.assign(Object.create(Object.getPrototypeOf(c)), c)