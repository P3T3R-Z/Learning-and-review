/// <reference path="interface.ts" />
var enums;
(function (enums) {
    //数字枚举
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    var sss = Direction.Up;
    //字符串枚举
    var Direction2;
    (function (Direction2) {
        Direction2["Up"] = "UP";
        Direction2["Down"] = "DOWN";
        Direction2["Left"] = "LEFT";
        Direction2["Right"] = "RIGHT";
    })(Direction2 || (Direction2 = {}));
    var xd = Direction2.Down;
})(enums || (enums = {}));
