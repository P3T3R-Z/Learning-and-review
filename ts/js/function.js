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
//函数申明
function sum(x, y) {
    return x + y;
}
//输入多余的（或者少于要求的）参数，是不被允许的：
//函数表达式
var mySum = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
//可选参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat = buildName('Tom', 'Cat');
var toms = buildName('Tom');
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//--------------------------------类
var Persons = /** @class */ (function () {
    function Persons(name) {
        this.name = '';
        this.name = name;
    }
    Persons.prototype.run = function () {
        return this.name + "\u5728running";
    };
    return Persons;
}());
//--------------------------------------继承
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this;
    }
    Web.prototype.work = function () {
        _super.prototype.run.call(this);
    };
    return Web;
}(Persons));
//--------------------------------------------多态
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Dogs = /** @class */ (function (_super) {
    __extends(Dogs, _super);
    function Dogs(name) {
        return _super.call(this, name) || this;
    }
    Dogs.prototype.eat = function () {
        return this.name + '吃狗粮';
    };
    return Dogs;
}(Animal));
//---------------------------------------------------------抽象类
//abstract关键词, 不能直接被实例化; 抽象方法必须在抽象类中
//抽象类的子类 `必须` 实现抽象类的抽象方法
var Animal2 = /** @class */ (function () {
    function Animal2(name) {
        this.name = name;
    }
    return Animal2;
}());
var Dogs2 = /** @class */ (function (_super) {
    __extends(Dogs2, _super);
    function Dogs2(name) {
        return _super.call(this, name) || this;
    }
    Dogs2.prototype.eat = function () {
        console.log(this.name + '吃屎');
    };
    return Dogs2;
}(Animal2));
