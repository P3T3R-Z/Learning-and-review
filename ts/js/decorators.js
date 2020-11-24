//---------------------------------类装饰器
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
function logclass(params) {
    console.log(params);
    //params就是当前类的构造函数
    //修改原型上的属性
    params.prototype.apiUrl = 'xxx';
}
//---------------------------------属性装饰器
//属性装饰器表达式会在运行时当做函数被调用, 传入2个参数
//1. 对于静态属性来说是类的构造函数, 对于实例属性是类的原型对象
//2. 属性名字
function logProperty(params) {
    console.log(params); //参数
    return function (target, attr) {
        console.log(target); //对于静态成员来说是类的构造函数, 对于实例成员是类的原型对象
        console.log(attr); //属性名字
        target[attr] = params;
    };
}
//----------------------普通装饰器
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient_1 = HttpClient;
    HttpClient.prototype.getData = function () {
        console.log(this.apiUrl, 3, HttpClient_1.init);
    };
    var HttpClient_1;
    HttpClient.init = false;
    __decorate([
        logProperty('http://www.xx.com/api/v1')
    ], HttpClient.prototype, "apiUrl", void 0);
    __decorate([
        logProperty(false)
    ], HttpClient, "init", void 0);
    HttpClient = HttpClient_1 = __decorate([
        logclass
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(); //"xxx",  3,  false
//-----------------------------装饰器工厂
function logclass2(params) {
    console.log(params); //当前参数
    return function (target) {
        console.log(target); //当前类的构造函数
    };
}
//----------------------普通装饰器
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
    }
    HttpClient2.prototype.getData = function () {
    };
    HttpClient2 = __decorate([
        logclass2('http://api.xxx.com')
    ], HttpClient2);
    return HttpClient2;
}());
//--------------------------装饰器修改类的属性,方法
function logclass3(params) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.apiUrl = '我是修改后的apiurl';
            return _this;
        }
        class_1.prototype.getData = function () {
            this.apiUrl = this.apiUrl + '++++++';
            console.log('我是装饰器getdata修改后的apiurl', this.apiUrl);
        };
        return class_1;
    }(params));
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3() {
        this.apiUrl = '我是构造函数里面的apiurl';
    }
    HttpClient3.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    HttpClient3 = __decorate([
        logclass3
    ], HttpClient3);
    return HttpClient3;
}());
var http3 = new HttpClient3();
// http3.getData()
