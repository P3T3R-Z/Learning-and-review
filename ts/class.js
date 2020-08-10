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
var x = /** @class */ (function () {
    function x(thename) {
        this.name = thename;
    }
    return x;
}());
var y = /** @class */ (function (_super) {
    __extends(y, _super);
    function y(props) {
        return _super.call(this, props) || this;
    }
    return y;
}(x));
//private
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
//new Animal("Cat").name; // 错误: 'name' 是私有的.
