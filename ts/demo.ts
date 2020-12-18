
//类型别名

type tp = {
    one: number,
    two: number
}

function plus({ one, two }: tp) {
  return one + two;
}

const res = plus({ one: 1, two: 4 });

//-------------------------------------------------

//接口例子
interface Girl {
    name: string;
    age: number;
    bust: number;
    waisline?:number;
    [propname: string]: any;
    say():string
}

const filterResume = (girl: Girl)=>{
    girl.age < 24 && girl.bust >=90 && console.log(girl.name+'通过面试')
    girl.age >= 24 || girl.bust <90 && console.log(girl.name+'淘汰')
}
const getResume = (girl:Girl)=>{
    console.log(girl.name+'年龄:'+girl.age);
    console.log(girl.name+'胸围:'+girl.bust);
}

class xiaojiejie implements Girl {
    name ='小红'
    age= 18;
    bust= 100; 
    sex='woman';
 
    say(){ 
        return '123'
    }
}

let xjj = new xiaojiejie();
filterResume(xjj)
getResume(xjj)








//---------------------------------------------
//数组类型声明
const arrss: (number | string)[] = [1, 2, "1", undefined, null];

//元组
const xjjs: [string, string, number] = ["王婆", "teacher", 50];
