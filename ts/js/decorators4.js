//------------------------------------------------方法装饰器
// 用于监视,修改,替换方法定义, 传入3个参数
//1.对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
//2.方法名字
//3.方法属性描述符
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logMethod(params) {
    console.log(params); //装饰器传参
    /**
     * http://www.iii.com/api
     * **/
    return function (target, methodName, desc) {
        console.log(target); //对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
        /**
         * {getData: ƒ, constructor: ƒ}
         * **/
        console.log(methodName); //方法名字
        /**
         * getData
         * **/
        console.log(desc, 'desc'); //方法属性描述符
        /**
         * {writable: true, enumerable: true, configurable: true, value: ƒ}
         * **/
        //-----------修改装饰器的方法, 把装饰器方法的参数改为string类型
        var pMethod = desc.value; //记录原来的方法
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (i) {
                return String(i);
            });
            pMethod.apply(this, args);
            console.log(this); //this指向类的示例对象
        };
    };
}
var HttpClient4 = /** @class */ (function () {
    function HttpClient4() {
    }
    HttpClient4.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    __decorate([
        logMethod('http://www.iii.com/api') //装饰器传参
    ], HttpClient4.prototype, "getData", null);
    return HttpClient4;
}());
var http4 = new HttpClient4();
http4.getData(1, 2, 4, 'xx');
/**
 * ["1", "2", "4", "xx"]
 * **/
