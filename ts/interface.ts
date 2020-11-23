interface Person {
  name: string;
  age?: number; //可选属性
  [prop: string]: any; //任意属性
  readonly x: number; //只读属性
}
let tom: Person = {
  name: "wang",
  gender: "male",
  x: 2,
};

//----------------------------------------------------属性接口
interface Fullname {
  firstName: string;
  lastName: string;
}
function printName(name: Fullname) {
  console.log(name.firstName + "-" + name.lastName);
}

//obj只需包含interface的参数即可
let obj = {
  age: 20,
  firstName: "张",
  lastName: "三",
};
printName(obj);

//直接写入参数时, 不可以有其他参数
printName({
  age: 20,
  firstName: "张",
  lastName: "三",
});

//-----------------------------------------------函数类型接口
//----------------约束函数的参数类型
interface encrypt {
  (key: string, value: string): string;
}
var md5: encrypt = function (key: string, value: string): string {
  return key + value;
};

//-------------------------------------------可索引接口
//-------------------对数组约束
interface userArr {
    [index:number]:string
}

var arr:userArr=['a','bb']

//--------------------对对象约束
interface userObj{
    [index:string]:any
}
var uarr:userObj = {name: '老王', age:2}


//----------------------------------------类类型接口
//类似类约束和抽象类
//implements 可以解释为实现,

interface Animal3{
    name:string,
    eat(str:string):void
}
//类必须实现类接口
class dog3 implements Animal3 {
    name:string;
    constructor(name:string){
        this.name=name
    }
    //不穿参数也是对的
    eat(){
        console.log(this.name + '吃饭')
    }
}

class cat3 implements Animal3 {
    name:string;
    constructor(name:string){
        this.name=name
    } 
    eat(foot:string){
        console.log(this.name + foot)
    }
}

//----------------------------------------接口扩展
//----------------------------------------接口可以继承接口
interface Animal4 { 
    eat():void,
}
// animal5继承animal4接口
interface Animal5 extends Animal4{
    work(code:string):void;
}

// 类per4必须实现Animal5的接口
class per4 implements Animal5 {
    name:string;
    constructor(name:string){
        this.name=name
    } 
    eat(){
        console.log(this.name + '吃饭')
    }
    work(){
        console.log(this.name + '看门')
    }
}

//-----------------------------------------类继承类并且实现继承的接口
// 父类
class Programmer {
    public name:string;
    constructor(name:string){
        this.name = name
    }
    coding(code){
        console.log(this.name+code)
    }
}

// 子类per5继承programmer类, 同时实现animal5的接口
class per5 extends Programmer implements Animal5{
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log(this.name + '吃饭')
    }
    work(code){
        console.log(this.name+'喜欢敲'+code)
    }
}

let lw = new per5('alice')

lw.eat() //alice喜欢吃饭
lw.work(lw.coding('ts')) //alice喜欢敲ts