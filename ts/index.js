// interface Person {
//     firstName: string;
//     lastName: string;
// }
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
// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = { firstName: "Jane", lastName: "User" };
// document.body.innerHTML = greeter(user);
// class Student {
//     fullName: string;
//     constructor(public firstName, public middleInitial, public lastName) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }
// interface Person {
//     firstName: string;
//     lastName: string;
// }
// function greeter(person : Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = new Student("Jane", "M.", "User");
// document.body.innerHTML = greeter(user);
// Declare a tuple type
// let x: [string, number];
// // Initialize it
// x = ['hello', 10]; // OK
// // Initialize it incorrectly
// x = [10, 'hello']; // Error
// enum Color {Red, Green, Blue}
// let c: Color = Color.Green;
// declare function create(o: object | null): void;
// create({ prop: 0 }); // OK
// create(null); // OK
// // create(42); // Error
// // create("string"); // Error
// // create(false); // Error
// create(undefined); // Error
// interface LabelledValue {
//     label: string;
//   }
//   function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
//   }
//   let myObj = {size: 10, label: "Size 10 Object"};
//   printLabel(myObj);
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }
// function createSquare(config: SquareConfig): {color: string; area: number} {
//   let newSquare = {color: "white", area: 100};
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }
// let mySquare = createSquare({color: "black"});
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//   let newSquare = {color: "white", area: 100};
//   if (config.color) {
//     // Error: Property 'clor' does not exist on type 'SquareConfig'
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }
// let mySquare = createSquare({color: "black"});
// interface Point {
//   readonly x: number;
//   readonly y?: number;
// }
// let p:Point={x:1,y:undefined}
// p.x=2
// interface SquareConfig {
//   color: string;
//   width?: number;
//   [propName: string]: any;
// }
// let squareOptions = { color: "red", width: 100, aa:1 };
// let mySquare = createSquare(squareOptions);
// function createSquare(config:SquareConfig):{color:string, aa?:string}{
//   return config
// }
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }
// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// }
// interface ClockConstructor {
//   new (hour: number, minute: number);
// }
// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }
// interface ClockConstructor {
//   new (hour: number, minute: number): ClockInterface;
// }
// interface ClockInterface {
//   tick();
// }
// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//   return new ctor(hour, minute);
// }
// class DigitalClock implements ClockInterface {
//   constructor(h: number, m: number) { }
//   tick() {
//       console.log("beep beep");
//   }
// }
// class AnalogClock implements ClockInterface {
//   constructor(h: number, m: number) { }
//   tick() {
//       console.log("tick tock");
//   }
// }
// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 32);
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    return Rhino;
}(Animal));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new Animal("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.
