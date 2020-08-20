//----------------------------------------类型推论
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// 等价于下边
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

//---------------联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 只能赋值string或者number
myFavoriteNumber = true // 会报错


//0--------------------访问联合类型的属性和方法
function getLength(something: string | number): number {
    //return something.length; // 会报错，字符串不含有length属性
  //想解决报错可以使用类型断言
  return (<string>something).length // 这样就不会报错
 }
 // 联合类型当赋值为一个类型会推断赋值为那个类型
 myFavoriteNumber = 'ss' // 变量被设定为字符串
 myFavoriteNumber.slice(0) // ok
 myFavoriteNumber = 5 // 变量被推断为number类型
 myFavoriteNumber.slice(0) // 会报错


//-------------------------------接口定义函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

//----------------------类型断言
// <类型>值

// 或

// 值 as 类型

function getLength2(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length; //不加类型断言就会报错
    } else {
        return something.toString().length;
    }
}

function toBoolean(something: string | number): boolean {
    return <boolean>something; // 报错， 布尔类型不能赋值给something
}

//-----------------------字符串字面量类型
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

//-----------------------------------元组
let tulpe: [string, number] = ['tom', 25];
//或者
let tulpe: [string, number];
tulpe[0] = 'tom';
tulpe[1] = 25;

tulpe[0].slice(1);
tulpe[1].toFixed(2);

//也可以只赋值其中一项
let tulpe: [string, number];
tulpe[0] = 'tom';

tulpe.push(true);// 报错 赋值类型不存在申明类型中

// 元组使用上需要特别注意的是：

// 元组初始化的时候必须赋值元组声明的所有类型变量：


// let tulpe: [string, number] = ['tom']; // 报错
// // 或者
// let tulpe: [string,number];
// tulpe = ['tome'] // 报错

//---------------------------枚举手动赋值
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

//值得注意的是：如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
enum Days2 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days2["Sun"] === 3); // true
console.log(Days2["Wed"] === 3); // true
console.log(Days2[3] === "Sun"); // false
console.log(Days2[3] === "Wed"); // true

//----------------------------------常数项和计算所得项
enum Color {Red, Green, Blue = "blue".length};
//如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
enum Color2 {Red = "red".length, Green, Blue};


//---------------------------------常数枚举
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

//---------------------------------------外部枚举
//declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
declare enum Directions2 {
    Up,
    Down,
    Left,
    Right
 }
 
 let directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
 //var directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];

 //-----------------------------抽象类
 abstract class Animal2 { // abstract标志类是抽象类
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
    }
  let a = new Animal2('Jack'); // 报错 抽象类不能实例化
//抽象类正确使用方式
  abstract class Animal {
    public name;
    public constructor(name) {
          this.name = name;
    }
    public abstract sayHi();
    }

  class Cat extends Animal {
    public sayHi() { // 实现抽象类中的方法
      console.log(`Meow, My name is ${this.name}`);
    }
}
let cat = new Cat('Tom');

//类的类型
class Animal3 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
    }
    let a3: Animal3 = new Animal3('Jack');
    console.log(a3.sayHi()); // My name is Jack


//-----------------------类接口

    interface Alarm {
        alert();
     }
     
     class Door {
     }
     
     class SecurityDoor extends Door implements Alarm {
        alert() {
            console.log('SecurityDoor alert');
        }
     }
     
     class Car implements Alarm {
        alert() {
            console.log('Car alert');
        }
     }


     //--------------------接口继承接口
     interface Alarm {
        alert();
     }
     
     interface LightableAlarm extends Alarm {
        lightOn();
        lightOff();
     }

     //-------------------------接口继承类

     class Point {
        x: number;
        y: number;
     }
     
     interface Point3d extends Point {
        z: number;
     }
     let point3d: Point3d = {x: 1, y: 2, z: 3};

     //-------------------------------------泛型
     function createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
      }
      
      createArray<string>(3, 'x'); // ['x', 'x', 'x']
      

      //多个类型参数
      
        function swap<T, U>(tuple: [T, U]): [U, T] {
            return [tuple[1], tuple[0]];
        }
        
        swap([7, 'seven']); // ['seven', 7]
  //-------------------------泛型约束
  interface Lengthwise {
    length: number;
  }
  
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }
  

  //--------------------------多个参数逐渐互相约束
  
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]; // 如果不使用泛型约束，这里会报错
    }
    return target;
  }
  
  let x = { a: 1, b: 2, c: 3, d: 4 };
  
  copyFields(x, { b: 10, d: 20 });
  
  //--------------------------------泛型接口
  interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
  }
  
  let createArray: CreateArrayFunc;
  createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }
  
  createArray(3, 'x'); // ['x', 'x', 'x']


  
///////////把泛型参数提前到接口名上
  interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
  }
  
  let createArray: CreateArrayFunc<any>;
  createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }
  
  createArray(3, 'x'); // ['x', 'x', 'x'] 

  //-------------------------------------------泛型类
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
  
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function(x, y) { return x + y; };


  //---------------------------------泛型参数的默认类型
  //为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
  function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }


  //---------------------------------------函数合并
  function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
  }
}

//---------------------------------接口合并
interface Alarm {
    price: number;
}
interface Alarm {
    weight: number;
}
//相当于
interface Alarm {
    price: number;
    weight: number;
  }

  //合并属性的类型必须唯一
  interface Alarm {
    price: number;
  }
  interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
  }

  //类型不一致，会报错
  interface Alarm {
    price: number;
  }
  interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
  }
  
//--------------------------迭代器区别
let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}
/////
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
    console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

//-------------------类型兼容性
interface Named {
  name: string;
}

let x2: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x2 = y;

let tt={name:'1', str:'1'}

function greet(n: Named) {
  console.log('Hello, ' + n.name);
}
greet(tt); // OK



let xf = (a: number) => 0;
let yf = (b: number, s: string) => 0;

yf = xf; // OK
xf = yf; // Error

let xs = () => ({name: 'Alice'});
let ys = () => ({name: 'Alice', location: 'Seattle'});

xs = ys; // OK
ys = xs; // Error, because x() lacks a location property