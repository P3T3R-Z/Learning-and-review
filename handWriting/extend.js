function A(name){
    this.name=name
}
function B(age){
    this.age=age
}
//原型链继承
A.prototype = new B();
//构造函数继承
function B(age){
    a.apply(this,name);
    this.age=age;
}
//组合式继承
function B(age){
    a.apply(this,name);
}
B.prototype = new A();
//原型式继承
function B(obj){
    let Func = function(){};
    Func.prototype=obj;
    return new Func()
}
let obj = new A();
let child = B(obj);
//寄生式继承
function B(obj){
    let Func = function(){};
    Func.prototype=obj;
    return new Func()
}
let obj = new A();
function Child(obj){
    let res = B(obj);
    res.hobby='吃';
    return res;
}
//寄生组合式继承
function B(age){
    A.apply(this,name);
    this.age=age;
}

let Apro = Object.create(A.prototype);
Apro.constructor=B;
B.prototype=Apro;