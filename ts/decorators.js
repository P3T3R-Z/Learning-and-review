//---------------------------装饰器
//-------------------------------------------------------------------------------类装饰器
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
function fn(v) {
    return function (cst) {
        var Ps = /** @class */ (function (_super) {
            __extends(Ps, _super);
            function Ps() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = v;
                return _this;
            }
            return Ps;
        }(cst));
    };
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        fn(10)
    ], Person);
    return Person;
}()); //age:number = 10
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat = __decorate([
        fn(20)
    ], Cat);
    return Cat;
}()); //age:number = 20
//----------------------------------------------------------------------------属性装饰器
/**
 * 属性装饰器表达式会在运行时当作函数被调用，传入两个参数：
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2成员的名字
**/
function logProp(params) {
    return function (target, attr) {
        console.log(target); // { constructor:f, getData:f } 
        console.log(attr); // url
        target[attr] = params; //通过原型对象修改属性值 = 装饰器传入的参数
        target.api = 'xxxxx'; //扩展属性
        target.run = function () {
            console.log('run...');
        };
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log(this.url);
    };
    __decorate([
        logProp('http://baidu.com')
    ], HttpClient.prototype, "url", void 0);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(); // http://baidu.com
console.log(http.api); // xxxxx
http.run(); // run...
//------------------------------------------------------------------------------------------------方法装饰器
/**
 * 方法装饰器被应用到方法的属性描述符上，可以用来监视、修改、替换方法的定义；
方法装饰器会在运行时传入3个参数：
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2成员的名字；
3成员的属性描述符；
 *
***/
function get(params) {
    console.log(params); // 装饰器传入的参数：http://baidu.com
    return function (target, methodName, desc) {
        console.log(target); // { constructor:f, getData:f } 
        console.log(methodName); // getData
        console.log(desc); // {value: ƒ, writable: true, enumerable: false, configurable: true} value就是方法体
        /* 修改被装饰的方法 */
        //1. 保存原方法体
        var oldMethod = desc.value;
        //2. 重新定义方法体
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //3. 把传入的数组元素都转为字符串
            var newArgs = args.map(function (item) {
                return String(item);
            });
            //4. 执行原来的方法体
            oldMethod.apply(this, newArgs);
            // 等效于 oldMethod.call(this, ...newArgs);
        };
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('getData: ', args);
    };
    __decorate([
        get('http://baidu.com')
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(1, 2, true); // getData: ["1", "2", "true"]
//-----------------------------------------------------------------------------------方法参数装饰器
/**
 *
 * 参数装饰器表达式会在运行时被调用，可以为类的原型增加一些元素数据，传入3个参数：
 *
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2方法名称，如果装饰的是构造函数的参数，则值为undefined
3参数在函数参数列表中的索引；
 * **/
function logParams(params) {
    console.log(params); // 装饰器传入的参数：uuid
    return function (target, methodName, paramIndex) {
        console.log(target); // { constructor:f, getData:f } 
        console.log(methodName); // getData
        console.log(paramIndex); // 0
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function (uuid, xx) {
        console.log(uuid);
    };
    __decorate([
        __param(0, logParams('uuid')), __param(1, logParams('xx'))
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
//--------------------------执行顺序
/***
 *
 * 在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
由上至下依次对装饰器表达式求值;
求值的结果会被当作函数，由下至上依次调用.
 * **/
function logClz11(params) {
    return function (target) {
        console.log('logClz11');
    };
}
function logClz22(params) {
    return function (target) {
        console.log('logClz22');
    };
}
function logAttr(params) {
    return function (target, attrName) {
        console.log('logAttr');
    };
}
function logMethod(params) {
    return function (target, methodName, desc) {
        console.log('logMethod');
    };
}
function logParam11(params) {
    return function (target, methodName, paramIndex) {
        console.log('logParam11');
    };
}
function logParam22(params) {
    return function (target, methodName, paramIndex) {
        console.log('logParam22');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log('get data');
    };
    HttpClient.prototype.setData = function (param1, param2) {
        console.log('set data');
    };
    __decorate([
        logAttr()
    ], HttpClient.prototype, "url", void 0);
    __decorate([
        logMethod()
    ], HttpClient.prototype, "getData", null);
    __decorate([
        __param(0, logParam11()), __param(1, logParam22())
    ], HttpClient.prototype, "setData", null);
    HttpClient = __decorate([
        logClz11('http://baidu.com'),
        logClz22()
    ], HttpClient);
    return HttpClient;
}());
// logAttr --> logMethod --> logParam22 --> logParam11 --> logClz22 --> logClz11
//# sourceMappingURL=decorators.js.map