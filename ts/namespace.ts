//命名空间

export namespace A {
    interface Animal3{
        name:string,
        eat(str:string):void
    }
    //类必须实现类接口
    export class dog3 implements Animal3 {
        name:string;
        constructor(name:string){
            this.name=name
        }
        //不穿参数也是对的
        eat(){
            console.log(this.name + '吃饭')
        }
    }
 
}

 
let dog = new A.dog3('小黑')
dog.eat()
