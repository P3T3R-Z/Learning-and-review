//类装饰器
//-------------------------------------普通装饰器 不传参
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
    console.log(params); //params就是当前类的构造函数
    /**
     * f HttpClient() {}  //构造函数
     * **/
    //修改原型上的属性
    params.prototype.apiUrl = 'xxx';
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    HttpClient = __decorate([
        logclass
    ], HttpClient);
    return HttpClient;
}());
var http = new HttpClient();
http.getData();
/**
 * 'xxx'
 * **/
//---------------------------------------装饰器工厂 可以传参
function logclass2(params) {
    console.log(params); //当前参数
    /**
     * http://api.xxx.com
     * **/
    return function (target) {
        console.log(target); //当前类的构造函数
        /**
        * f HttpClient2() {}  //构造函数
        * **/
        target.prototype.getData = function () {
            console.log(2);
        };
    };
}
//----------------------普通装饰器
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
    }
    HttpClient2.prototype.getData = function () {
        console.log(1);
    };
    HttpClient2 = __decorate([
        logclass2('http://api.xxx.com')
    ], HttpClient2);
    return HttpClient2;
}());
var http2 = new HttpClient2();
http2.getData(); //2
//--------------------------类装饰器修改类的属性,方法
function change(params) {
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
var HttpClient_c = /** @class */ (function () {
    function HttpClient_c() {
        this.apiUrl = '我是构造函数里面的apiurl';
    }
    HttpClient_c.prototype.getData = function () {
        console.log(this.apiUrl);
    };
    HttpClient_c = __decorate([
        change
    ], HttpClient_c);
    return HttpClient_c;
}());
var http3 = new HttpClient_c();
http3.getData();
/**
 * 我是装饰器getdata修改后的apiurl 我是修改后的apiurl++++++
 * **/
//装饰器执行顺序
//  属性->方法->方法参数->类
// 多个同级装饰器,首先执行后面的
