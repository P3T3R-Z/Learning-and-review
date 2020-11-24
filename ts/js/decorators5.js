//------------------------------------------------方法参数装饰器
// 传入3个参数
//1.类的原型对象
//2.方法名字
//3.参数索引值
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function logParams(params) {
    console.log(params); //装饰器传参
    /**
     * http://www.iii.com/api
     * **/
    return function (target, methodName, paramsIndex) {
        console.log(target); //对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
        /**
         * {getData: ƒ, constructor: ƒ}
         * **/
        console.log(methodName); //方法名字
        /**
         * getData
         * **/
        console.log(paramsIndex, 'paramsIndex'); //参数索引值
        /**
         *  0 'paramsIndex'
         * **/
    };
}
var HttpClient5 = /** @class */ (function () {
    function HttpClient5() {
    }
    HttpClient5.prototype.getData = function (uuid) {
        console.log('uuid', uuid);
    };
    __decorate([
        __param(0, logParams('uuid'))
    ], HttpClient5.prototype, "getData", null);
    return HttpClient5;
}());
var http5 = new HttpClient5();
http5.getData('123123aaa');
/**
 * 123123aaa
 * **/
