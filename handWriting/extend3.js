//组合继承 原型链继承和经典继承双剑合璧。
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

//优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
//缺点是会调用两次父构造函数
/*
一次是设置子类型实例的原型的时候：

Child.prototype = new Parent();
一次在创建子类型实例的时候：

var child1 = new Child('kevin', '18');
*/