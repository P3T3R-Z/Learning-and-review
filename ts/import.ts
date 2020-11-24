//引入命名空间
import {A} from "./namespace";
let dog = new A.dog3('小黑')
dog.eat()


// 这种方式引入则不需要export, 高版本ts将不支持
// ///<reference path="namespace.ts" />
// let dog = new A.dog3('小黑')
// dog.eat()