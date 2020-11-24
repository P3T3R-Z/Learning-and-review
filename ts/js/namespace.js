"use strict";
//命名空间
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A;
(function (A) {
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
    A.dog3 = dog3;
    var s = 1;
})(A = exports.A || (exports.A = {}));
var dog = new A.dog3('小黑');
dog.eat();
