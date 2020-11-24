"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//引入命名空间
var namespace_1 = require("./namespace");
var dog = new namespace_1.A.dog3('小黑');
dog.eat();
// 这种方式引入则不需要export, 高版本ts将不支持
// ///<reference path="namespace.ts" />
// let dog = new A.dog3('小黑')
// dog.eat()
