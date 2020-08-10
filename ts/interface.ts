interface arrow {
  watch?: number | string; //非必须
  [propname: string]: any; //字符串类型参数
}

var s: arrow = {
  ss: "123",
  watch: "pp",
};

//----------------------------------------- 函数接口,限制参数类型与返回类型
interface SearchFunc {
    (source?: string|number, subString?: string): boolean;
  }

  let asd: SearchFunc;

asd =  function (source?: number|string, subString?: string){
      return true
  }

//--------------------------------------- 数字索引

interface arrayis {
    readonly [index:number]:any  //只读属性
}


let ss:arrayis=[1,2,'3']
//ss[0]='c'//异常

//--------------------------------------- 字符串索引
//length与name同数组元素类型相符
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    //name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }

//--------------------------------------- 类类型
//与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
interface ClockInterface2 {
    currentTime: Date;
}

class Clock2 implements ClockInterface2 {
    currentTime: Date;
    constructor(h: number, m: number) {
        this.currentTime=new Date()
     }
}
//------------------------------------------你也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样：
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date):void;
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { 
        this.currentTime=new Date()
    }
}

//-----------------------------------类静态部分与实例部分的区别
/*
因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口，
 ClockConstructor为构造函数所用和ClockInterface为实例方法所用。
  为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
*/

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface3;
}
interface ClockInterface3 {
    tick:Function;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface3 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


//--------------------------------------继承接口


interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

//--------------------------------一个接口可以继承多个接口，创建出多个接口的合成接口。
interface Shape2 {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape2, PenStroke {
    sideLength: number;
}

let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
//---------------------混合类型

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

//---------------------------------接口继承
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Images implements SelectableControl {
    select() { }
}

class Locations {

}