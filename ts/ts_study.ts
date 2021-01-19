/**---------------断言
 *
 * **/
// 类型断言
//尖括号

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as语法
let someValue2: any = "this is a string";
let strLength2: number = (someValue as string).length;

//非空断言
//在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 null 和 undefined 。
//忽略 undefined 和 null 类型
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'.
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
//.调用函数时忽略 undefined 类型

type NumGenerator = () => number;

function myFunc2(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}

/***-----------类型守卫
 * 类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。 换句话说，类型保护可以保证一个字符串是一个字符串，
 * 尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。
 * 目前主要有四种的方式来实现类型保护：
 */

// in 关键词
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
//typeof
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
//instanceof
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}

//自定义类型保护的类型谓词
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

/**---------------------------联合类型和类型别名
 *
 * **/
//联合类型
const sayHello = (name: string | undefined) => {
  /* ... */
};

//可辨识联合
//1可辨识
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}

interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission;
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}
//2联合类型
type Vehicle = Motorcycle | Car | Truck;

let VehicleObj: Vehicle = {
  vType: "truck",
  capacity: 2,
};
//3类型守卫
const EVALUATION_FACTOR = Math.PI;
function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}

/**交叉类型
 * 在 TypeScript 中交叉类型是将多个类型合并为一个类型。
 * 通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 *
 *
 * **/
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

let point: Point = {
  x: 1,
  y: 1,
};

//6.1 同名基础类型属性的合并
// 那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
p = { c: 6, d: "d", e: "e" }; //为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

//TypeScript 函数
//函数重载
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
add(1, "1");

/**----interface
 *
 * **/

//  可选 | 只读属性
//只读属性用于限制只能在对象刚刚创建的时候修改其值
interface Person3 {
  readonly name: string;
  age?: number;
}
//ReadonlyArray<T>类型
let a4: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a4;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a4 = ro; // error!

//任意属性
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: any;
}

const p1: Person4 = { name: "semlinker" };
const p2: Person4 = { name: "lolo", age: 5 };
const p3: Person4 = { name: "kakuqo", sex: 1 };

//接口定义多次合并
interface Point4 {
  x: number;
}
interface Point4 {
  y: number;
}

const point4: Point4 = { x: 1, y: 2 };

//class
/**
 * 私有字段以 # 字符开头，有时我们称之为私有名称；
每个私有字段名称都唯一地限定于其包含的类；
不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
私有字段不能在包含的类之外访问，甚至不能被检测到。
 * 
 * 
 * **/
class Person5 {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

let semlinker = new Person5("Semlinker");

//类的重载
class ProductService {
  getProducts(): void;
  getProducts(id: number): void;
  getProducts(id?: number) {
    if (typeof id === "number") {
      console.log(`获取id为 ${id} 的产品信息`);
    } else {
      console.log(`获取所有的产品信息`);
    }
  }
}

const productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息

/**泛型工具类型
 *
 * **/

//  1.typeof
//typeof 操作符可以用来获取一个变量声明或对象的类型。
interface Person6 {
  name: string;
  age: number;
}

const sem: Person6 = { name: "semlinker", age: 33 };
type Sem = typeof sem; // -> Person6

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]

//keyof
//该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
interface Person7 {
  name: string;
  age: number;
}

type K1 = keyof Person7; // "name" | "age"
type K2 = keyof Person7[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [xxx: string]: Person7 }; // string | number

//在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string;
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
//为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，
//JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 keyof { [x: string]: Person } 的结果会返回 string | number。

//in 关键词
//in 用来遍历枚举类型：
type Keys = "a" | "b" | "c";

type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }

//infer
//在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : any;

//extends
//有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity(3); // Error, number doesn't have a .length property

loggingIdentity({ length: 10, value: 3 });

//Partial
//作用就是将某个类型里的属性全部变为可选项 ?。
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * type Partial<T> = {
  [P in keyof T]?: T[P];
};
在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。

 * **/

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "Learn TS",
  description: "Learn TypeScript",
};

const todo2 = updateTodo(todo1, {
  description: "Learn TypeScript Enum",
});

//--------------------------------------------------------------------------------------------decorators装饰器
//需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用 experimentalDecorators 编译器选项：
//命令行：`tsc --target ES5 --experimentalDecorators`

//------------------------------------------------类装饰器
//修改原型方法
function Greeter(target: Function): void {
  //target为构造函数
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
  greet() {}
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';

//传参
function Greeter2(greeting: string) {
  //greeting为传参
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter2("Hello TS!")
class Greeting2 {
  constructor() {
    // 内部实现
  }
  greet() {}
}

let myGreeting2 = new Greeting2();
myGreeting2.greet(); // console output: 'Hello TS!';

//------------------------------------------------------属性装饰器
//target: Object - 被装饰的类
// propertyKey: string | symbol - 被装饰类的属性名
function logProperty3(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true, //如果设置为 false, 不可以采用 数据运算符 进行赋值
    enumerable: true, //此处设置为false， 在枚举的时候会忽略
    configurable: true, //如果为 false , 那么不可以修改, 不可以删除.
  });

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Personp {
  @logProperty3
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p4 = new Personp("semlinker");
p4.name = "kakuqo";
