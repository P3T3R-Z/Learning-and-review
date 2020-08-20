//---------------------------装饰器
//-------------------类装饰器
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//---------------------1.类装饰器在类声明之前被声明，应用于类构造函数，可以监视、修改、替换类的定义，传入一个参数；
//--------------------logClz() 接收的参数params就是被装饰的类HttpClient
function logClz(params) {
    console.log(params); // class HttpClient
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClz
    ], HttpClient);
    return HttpClient;
}());
//---------------------为HttpClient动态扩展属性属性和方法
function logClz(params) {
    params.prototype.url = 'xxxx';
    params.prototype.run = function () {
        console.log('run...');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClz
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
http.run(); // run...
//------------------2.装饰器工厂
function logClz(params) {
    console.log('params:', params); //params: hello
    return function (target) {
        console.log('target:', target); //target: class HttpClient
        target.prototype.url = params; //扩展一个url属性
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClz('hello')
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
console.log(http.url); //hello
//-----------------------3重载构造函数
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数；
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明；
function logClz(target) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.url = 'change url';
            return _this;
        }
        class_1.prototype.getData = function () {
            console.log('getData:', this.url);
        };
        return class_1;
    }(target));
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.url = 'init url';
    }
    HttpClient.prototype.getData = function () {
        console.log(this.url);
    };
    HttpClient = __decorate([
        logClz
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient(); //装饰器返回的就是HttpClient的子类，因此TS可以自动推导 http 的类型
http.getData(); //getData: change url
//-------------------------4.修改类的定义
function fn(constructor) {
    var Ps = /** @class */ (function (_super) {
        __extends(Ps, _super);
        function Ps() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.age = 20; //扩展一个类型为number的属性age
            return _this;
        }
        return Ps;
    }(constructor));
    return Ps;
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        fn
    ], Person);
    return Person;
}());
var p = new Person(); //装饰之后的Person已经变成了Ps
console.log(p.age); //20
