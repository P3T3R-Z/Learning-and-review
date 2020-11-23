//函数申明
function sum(x: number, y: number): number {
    return x + y;
}
//输入多余的（或者少于要求的）参数，是不被允许的：

//函数表达式
let mySum = function (x: number, y: number): number {
    return x + y;
};


//接口定义函数
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}


//可选参数

function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let toms = buildName('Tom');


// 重载: 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}



//--------------------------------类
class Persons{
    name: string='';
    constructor(name: string){
        this.name = name
    }
    run():string{
        return `${this.name}在running`
    }
}
//--------------------------------------继承
class Web extends Persons{
    constructor(name:string){
        super(name); //继承父类的属性
    }
    work(){
        super.run()
    }
}

//--------------------------------------------多态
class Animal {
    name:string;
    constructor(name:string){
        this.name = name
    }
}
class Dogs extends Animal {
    constructor(name:string){
        super(name)
    }
    eat(){
        return this.name +'吃狗粮'
    }
}

//---------------------------------------------------------抽象类
//abstract关键词, 不能直接被实例化; 抽象方法必须在抽象类中
//抽象类的子类 `必须` 实现抽象类的抽象方法
abstract class Animal2 {
    public name:string;
    constructor(name:string){
        this.name = name
    }
    abstract eat():any;
}

class Dogs2 extends Animal2 {
    
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log(this.name+'吃屎')
    }
}
 