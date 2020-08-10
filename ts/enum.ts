/// <reference path="interface.ts" />
//命名空间
namespace enums {
  //数字枚举
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
  }

  let sss = Direction.Up;

  //字符串枚举

  enum Direction2 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }

  let xd = Direction2.Down;
}
