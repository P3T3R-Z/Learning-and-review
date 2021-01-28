function myInstance(left,right){
    let proto = left.__proto__;
    while(true){
        if(proto===null){return false};
        if(proto===right.prototype){
            return true;
        }
        proto = proto.__proto__;
    }
}
/*instanceof 运算符用于测试构造函数的 prototype 属性是否出现在对象原型链中的任何位置
换句话说，如果A instanceof B，那么 A 必须是一个对象，而 B 必须是一个合法的 JavaScript 函数。在这两个条件都满足的情况下：
判断 B 的 prototype 属性指向的原型对象(B.prototype)是否在对象 A 的原型链上。

如果在，则为 true；如果不在，则为 false。
instanceof 的实现原理，其实思路也很简单，无非就是一个沿原型链向上查找的过程
*/