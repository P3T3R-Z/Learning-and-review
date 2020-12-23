//------------------------类型别名

type tp = {
  one: number;
  two: number;
};

function plus({ one, two }: tp) {
  return one + two;
}

const res = plus({ one: 1, two: 4 });

//-------------------------------------------------

//-------------接口例子
interface Girl {
  name: string;
  age: number;
  bust: number;
  waisline?: number;
  [propname: string]: any;
  say(): string;
}

const filterResume = (girl: Girl) => {
  girl.age < 24 && girl.bust >= 90 && console.log(girl.name + "通过面试");
  girl.age >= 24 || (girl.bust < 90 && console.log(girl.name + "淘汰"));
};
const getResume = (girl: Girl) => {
  console.log(girl.name + "年龄:" + girl.age);
  console.log(girl.name + "胸围:" + girl.bust);
};

class xiaojiejie implements Girl {
  name = "小红";
  age = 18;
  bust = 100;
  sex = "woman";

  say() {
    return "123";
  }
}

let xjj = new xiaojiejie();
filterResume(xjj);
getResume(xjj);

//---------------------------------------------
//数组类型声明
const arrss: (number | string)[] = [1, 2, "1", undefined, null];

//----------------------------------元组
const xjjs: [string, string, number] = ["王婆", "teacher", 50];

//-----------------------------------------类
// public 公共 外部内部都可使用
// private 私有 内部可以使用, 外部和继承都不可以使用
// protected 受保护的  外部不可访问, 继承可以使用
class Person {
  private age: number;
  protected name: string;
  public sayHello() {
    console.log(this.name + "say hello");
  }
}

class Teacher extends Person {
  public sayBye() {
    this.age = 1;
    this.name = "王";
  }
}

//------------------------------------构造函数
class Person2 {
  // public name:string;
  // constructor(name:string){
  //     this.name = name
  // }

  //------简写
  constructor(public name: string) {}
}

class Teacher2 extends Person2 {
  constructor(name: string, public age: number) {
    super(name);
  }
}

//----------------------------------set get

class XiaoJieJie {
  public readonly name: string;
  constructor(private _age: number, name: string) {
    this.name = name;
  }

  get age() {
    return this._age - 10;
  }

  set age(age: number) {
    this._age = age + 4;
  }

  static say() {
    console.log("i love you");
  }
}

var dajiao = new XiaoJieJie(28, "小花");
console.log("get", dajiao.age); //18
dajiao.age = 25;
console.log("set", dajiao.age); //19
XiaoJieJie.say(); //i love you
dajiao.name = "小草"; //readonly不可以修改

//-------------------------------抽象类 abstract
abstract class GRIL {
  abstract skill(); //抽象方法不确定返回类型,省略大括号
}

class Waitter extends GRIL {
  skill() {
    console.log(1);
  }
}
class baseTeacher extends GRIL {
  skill() {
    console.log(2);
  }
}
class advanceTeacher extends GRIL {
  skill() {
    console.log(3);
  }
}

//---------------------------------联合类型 类型守护
interface waiter {
  anjiao: boolean;
  skill: () => {};
}
interface teacher {
  anjiao: boolean;
  say: () => {};
}

function judgewho(anmouys: waiter | teacher) {
  if (anmouys.anjiao) {
    (anmouys as waiter).skill(); //断言
  } else {
    (anmouys as teacher).say();
  }
}

function judgewho2(anmouys: waiter | teacher) {
  if ("skill" in anmouys) {
    anmouys.skill();
  } else {
    anmouys.say();
  }
}

function judgewho3(anmouys: waiter | teacher) {
  if ("skill" in anmouys) {
    anmouys.skill();
  } else {
    anmouys.say();
  }
}

function add(first: number | string, second: number | string) {
  if (typeof first === "number" && typeof second === "number") {
    return first + second;
  } else {
    return first + "" + second + "";
  }
}
//------
class Numberobj {
  count: number;
}
function addobj(first: object | Numberobj, second: object | Numberobj) {
  if (first instanceof Numberobj && second instanceof Numberobj) {
    return first.count + second.count;
  }
  return 0;
}

//-----------------------枚举

enum server {
  MSG,
  SPA,
  DBJ,
}
console.log(server.MSG); //0
console.log(server.SPA); //1
console.log(server.DBJ); //2
console.log(server[0]); //MSG

//---------------------------泛型

function join<t>(f: t, s: t) {
  return `${f}${s}`;
}
join<string>("a", "b");

//-----------------------------------泛型使用数组
function mfun<T>(params: T[]) {
  return params;
}
function mfun2<T>(params: Array<T>) {
  return params;
}
mfun<string>(["1", "2"]);
mfun2<number>([1, 2]);

//-----------------------------多个泛型
function morefuc<t, p>(f: t, s: p) {
  return `${f}${s}`;
}
morefuc<string, number>("1", 1);

//----------------------------泛型继承接口

interface xj {
  name: string;
}

class XIAOJIE<T extends xj> {
  constructor(private girls: T[]) {}
  getGirl(index: number): string {
    return this.girls[index].name;
  }
}
var happy = new XIAOJIE([{ name: "小红" }, { name: "小张" }, { name: "小丽" }]);

//---------------------------泛型约束
class selectXJ<T extends number | string> {
  constructor(private girls: T[]) {}
  getgirl(index: number): T {
    return this.girls[index];
  }
}
var sxj = new selectXJ([1,2,'3'])
