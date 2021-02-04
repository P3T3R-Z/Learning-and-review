//借用构造函数(经典继承)
function Parent () {
  this.names = ['kevin', 'daisy'];
}

function Child () {
  Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]

/*
优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参
*/



// 缺点:  1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
//2.无法继承原型链方法
function Parent (name) {
  this.name = name;
}

function Child (name) {
  Parent.call(this, name);
}
Parent.prototype.say=function(){console.log(this.name)}
var child1 = new Child('kevin');

console.log(child1.name); // kevin
child1.say() //     child2.say is not a function
var child2 = new Child('daisy');

console.log(child2.name); // daisy