var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//---------------------------------属性装饰器
//属性装饰器表达式会在运行时当做函数被调用, 传入2个参数
//1. 对于静态属性来说是类的构造函数, 对于实例属性是类的原型对象
//2. 属性名字
function logProperty(params) {
    console.log(params); //参数
    /**
     *  http://www.xx.com/api/v1
     *
     *  true
     * **/
    return function (target, attr) {
        console.log(target); //对于静态成员来说是类的构造函数, 对于实例成员是类的原型对象
        /**
         * {getData: ƒ, constructor: ƒ}  //原型对象
         *
         * ƒ HttpClient3() {}  //构造函数
         * **/
        console.log(attr); //属性名字
        /**
         * apiUrl
         *
         * init
         * **/
        target[attr] = params; //修改
    };
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3() {
    }
    HttpClient3.prototype.getData = function () {
        console.log(this.apiUrl, HttpClient3.init);
    };
    HttpClient3.init = false;
    __decorate([
        logProperty('http://www.xx.com/api/v1') //-----------属性装饰器,传参
    ], HttpClient3.prototype, "apiUrl", void 0);
    __decorate([
        logProperty(true)
    ], HttpClient3, "init", void 0);
    return HttpClient3;
}());
var http3 = new HttpClient3();
http3.getData();
/**
 *  http://www.xx.com/api/v1 true
 * **/
