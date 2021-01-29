//es5继承
//父类
function Person(name) {
  this.name = name;
  this.sum = function () {
    alert(this.name);
  };
}
Person.prototype.age = 10; //父类构造函数添加原型属性

//-------------------原型链继承
//特点: 实例可继承的属性有: 实例的构造函数属性, 父类的构造函数属性, 父类的原型属性, 
//缺点: 1新实例无法向父类构造函数传参, 2继承单一,  3所有实例都会共享父类实例属性 （原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
function Per() {
  this.name = "Per";
}
Per.prototype = new Person(); //关键点
var per1 = new Per();
console.log(per1.age); //10
console.log(per1 instanceof Person); //true
//修改父类实例属性,影响子类的属性
Person.prototype.age = 11;
console.log(per1.age); //11

//---------------------构造函数继承
//用.call()和.apply()将父类构造函数引入子类函数
//特点: 1.只继承父类构造函数属性, 没有继承父类原型属性
//     2. 解决了原型链继承缺点1,2,3
//     3. 可以继承多个构造函数属性 (call多个)
//缺点: 1.只能继承父类构造函数属性
//      2.无法实现构造函数的复用(每次用每次都要重新调用)
//      3.每隔新实例都有父类构造函数的副本,臃肿
function Con() {
  Person.call(this, "jer"); //关键点
}
var con1 = new Con();
console.log(con1.name); //'jer          继承父类构造函数属性
console.log(con1.age); // undefined,  没有继承父类原型属性
console.log(con1 instanceof Person); //false

/*-------------组合继承
结合组合构造函数继承和原型链继承, 可以传参可以复用
特点: 1.可以继承父类原型上的属性, 可以传参,可以复用
      2. 每个新实例引入的构造函数属性都是私有的
缺点: 调用两次父类的构造函数,耗内存,子类的构造函数会代替原型上的父类构造函数
*/
function Sub(name) {
  Person.call(this, name); //构造函数继承
}
Sub.prototype = new Person(); //原型链继承
var sub = new Sub("ger");
console.log(sub.name); //ger 继承构造函数属性
console.log(sub.age); //10 继承父类原型属性

/*--------------------原型式继承
　重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
　　　　特点：类似于复制一个对象，用函数来包装。
　　　　缺点：1、所有实例都会继承原型上的属性。
　　　　　　　2、无法实现复用。（所有实例都会继承原型上的属性; 无法实现复用）
*/
function content(obj) {
  function F() {}
  F.prototype = obj; //继承传入的参数
  return new F(); //返回函数对象
}
var sup = new Person(); //父类实例
var sup1 = content(sup);
console.log(sup1.age); //10 继承父类函数属性

/*-----------------------寄生式继承
　　重点：就是给原型式继承外面套了个壳子。
　　　　优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
　　　　缺点：没用到原型，无法复用。
*/

function content(obj) {
  function F() {}
  F.prototype = obj; //继承传入的参数
  return new F(); //返回函数对象
}
var sup = new Person(); //父类实例
function subobject(obj){
    var sub = content(obj)
    sub.name = 'gar'
    return sub
}
var sup2 = subobject(sup) //这个函数申明之后就成了可以添属性的对象
console.log(typeof subobject) //function
console.log(typeof sup2) //object
console.log(sup2.name) //gar  返回sub对象, 继承sub属性
   

/*---------------寄生组合式继承

组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
　重点：修复了组合继承的问题
*/

function content(obj){
    function F(){}
    F.prototype = obj
    return new F()
}
var con = content(Person.prototype); //con实例的原型继承了父类函数的原型
//上述更像是原型链继承, 只不过只继承了原型属性

function Sub(){
    Person.call(this) //这个继承了父类构造函数的属性
}//解决了组合式两次调用构造函数属性的缺点

Sub.prototype = con//继承con实例
con.constructor = Sub;//修复实例
var sub1 = new Sub()
//Sub的示例就继承了构造函数的属性,父类实例,con的函数属性
console.log(sub1.age) //10