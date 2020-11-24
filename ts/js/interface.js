"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tom = {
    name: "wang",
    gender: "male",
    x: 2,
};
function printName(name) {
    console.log(name.firstName + "-" + name.lastName);
}
//obj只需包含interface的参数即可
var obj = {
    age: 20,
    firstName: "张",
    lastName: "三",
};
printName(obj);
//直接写入参数时, 不可以有其他参数
printName({
    age: 20,
    firstName: "张",
    lastName: "三",
});
var md5 = function (key, value) {
    return key + value;
};
var arr = ['a', 'bb'];
var uarr = { name: '老王', age: 2 };
//类必须实现类接口
var dog3 = /** @class */ (function () {
    function dog3(name) {
        this.name = name;
    }
    //不穿参数也是对的
    dog3.prototype.eat = function () {
        console.log(this.name + '吃饭');
    };
    return dog3;
}());
var cat3 = /** @class */ (function () {
    function cat3(name) {
        this.name = name;
    }
    cat3.prototype.eat = function (foot) {
        console.log(this.name + foot);
    };
    return cat3;
}());
// 类per4必须实现Animal5的接口
var per4 = /** @class */ (function () {
    function per4(name) {
        this.name = name;
    }
    per4.prototype.eat = function () {
        console.log(this.name + '吃饭');
    };
    per4.prototype.work = function () {
        console.log(this.name + '看门');
    };
    return per4;
}());
//-----------------------------------------类继承类并且实现继承的接口
// 父类
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (code) {
        console.log(this.name + code);
    };
    return Programmer;
}());
// 子类per5继承programmer类, 同时实现animal5的接口
var per5 = /** @class */ (function (_super) {
    __extends(per5, _super);
    function per5(name) {
        return _super.call(this, name) || this;
    }
    per5.prototype.eat = function () {
        console.log(this.name + '吃饭');
    };
    per5.prototype.work = function (code) {
        console.log(this.name + '喜欢敲' + code);
    };
    return per5;
}(Programmer));
var lw = new per5('alice');
lw.eat(); //alice喜欢吃饭
lw.work(lw.coding('ts')); //alice喜欢敲ts
//申明的全局命名空间
www.s = 123;
