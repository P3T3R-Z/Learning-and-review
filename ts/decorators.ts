//---------------------------装饰器
//-------------------------------------------------------------------------------类装饰器

//---------------------1.类装饰器在类声明之前被声明，应用于类构造函数，可以监视、修改、替换类的定义，传入一个参数；
//--------------------logClz() 接收的参数params就是被装饰的类HttpClient
function logClz(params: any) {
  console.log(params); // class HttpClient
}
@logClz
class HttpClient {
  constructor() {}
}



//---------------------为HttpClient动态扩展属性属性和方法
function logClz(params:any) {
  params.prototype.url = 'xxxx';
  params.prototype.run = function() {
      console.log('run...');
  };
}
@logClz
class HttpClient {
  constructor() {}
}
var http:any = new HttpClient();
http.run(); // run...

//------------------2.装饰器工厂
function logClz(params:string) {
  console.log('params:', params);  //params: hello
  return function(target:any) {
      console.log('target:', target);  //target: class HttpClient
      target.prototype.url = params;  //扩展一个url属性
  }
}
@logClz('hello')
class HttpClient {
  constructor() { }
}
var http:any = new HttpClient();
console.log(http.url);  //hello


//-----------------------3重载构造函数
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数；
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明；
function logClz(target:any) {
  return class extends target {
      url = 'change url'
      getData() {
          console.log('getData:', this.url);
      }
  }
}
@logClz
class HttpClient {
  public url:string|undefined;
  constructor() {
      this.url = 'init url'
  }
  getData() {
      console.log(this.url);
  }
}
var http = new HttpClient();  //装饰器返回的就是HttpClient的子类，因此TS可以自动推导 http 的类型
http.getData(); //getData: change url

//-------------------------4.修改类的定义

function fn<T extends {new(...args: any[]): {}}>(constructor: T): T {
  class Ps extends constructor {
      age: number = 20;   //扩展一个类型为number的属性age
     
  }
  return Ps;
}
@fn
class Person{
  
}
let p:any = new Person(); //装饰之后的Person已经变成了Ps
console.log(p.age)  //20


function fn(v: number) {
  return function<T extends {new(...args: any[]): {}}>(cst: T): T {
      class Ps extends cst {
          age: number = v;
      }
  }
}
@fn(10)
class Person { }  //age:number = 10
@fn(20)
class Cat { }  //age:number = 20


//----------------------------------------------------------------------------属性装饰器
/**
 * 属性装饰器表达式会在运行时当作函数被调用，传入两个参数：
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2成员的名字
**/

function logProp(params:any) {
  return function(target:any, attr:any) {
      console.log(target)  // { constructor:f, getData:f } 
      console.log(attr)  // url
      target[attr] = params;  //通过原型对象修改属性值 = 装饰器传入的参数
      target.api = 'xxxxx';  //扩展属性
      target.run = function() {  //扩展方法
          console.log('run...');
      }
  }
}
class HttpClient {
  @logProp('http://baidu.com')
  public url:any|undefined;
  constructor() { }
  getData() {
      console.log(this.url);
  }
}
var http:any = new HttpClient();
http.getData();  // http://baidu.com
console.log(http.api);  // xxxxx
http.run();  // run...


//------------------------------------------------------------------------------------------------方法装饰器
/** 
 * 方法装饰器被应用到方法的属性描述符上，可以用来监视、修改、替换方法的定义；
方法装饰器会在运行时传入3个参数：
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2成员的名字；
3成员的属性描述符；
 * 
***/

function get(params:any) {
  console.log(params) // 装饰器传入的参数：http://baidu.com
  return function(target:any, methodName:any, desc:any) {
      console.log(target)  // { constructor:f, getData:f } 
      console.log(methodName)  // getData
      console.log(desc)  // {value: ƒ, writable: true, enumerable: false, configurable: true} value就是方法体
      /* 修改被装饰的方法 */
      //1. 保存原方法体
      var oldMethod = desc.value;

      //2. 重新定义方法体
      desc.value = function(...args:any[]) {
          //3. 把传入的数组元素都转为字符串
          let newArgs = args.map((item)=>{
              return String(item);
          });
          //4. 执行原来的方法体
          oldMethod.apply(this, newArgs);
          // 等效于 oldMethod.call(this, ...newArgs);
      }
  }
}
class HttpClient {
  constructor() { }
  @get('http://baidu.com')
  getData(...args:any[]) {
      console.log('getData: ', args);
  }
}
var http = new HttpClient();
http.getData(1, 2, true);  // getData: ["1", "2", "true"]


//-----------------------------------------------------------------------------------方法参数装饰器
/**
 * 
 * 参数装饰器表达式会在运行时被调用，可以为类的原型增加一些元素数据，传入3个参数：
 * 
1对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
2方法名称，如果装饰的是构造函数的参数，则值为undefined
3参数在函数参数列表中的索引；
 * **/
function logParams(params:any) {
  console.log(params)  // 装饰器传入的参数：uuid
  return function(target:any, methodName:any, paramIndex:any) {
      console.log(target)  // { constructor:f, getData:f } 
      console.log(methodName)  // getData
      console.log(paramIndex)  // 0
  }
}
class HttpClient {
  constructor() { }
  getData(@logParams('uuid') uuid:any, @logParams('xx') xx: any) {
      console.log(uuid);
  }
}

//--------------------------执行顺序
/***
 * 
 * 在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
由上至下依次对装饰器表达式求值;
求值的结果会被当作函数，由下至上依次调用.
 * **/

function logClz11(params:string) {
  return function(target:any) {
      console.log('logClz11')
  }
}
function logClz22(params?:string) {
  return function(target:any) {
      console.log('logClz22')
  }
}
function logAttr(params?:string) {
  return function(target:any, attrName:any) {
      console.log('logAttr')
  }
}
function logMethod(params?:string) {
  return function(target:any, methodName:any, desc:any) {
      console.log('logMethod')
  }
}
function logParam11(params?:any) {
  return function(target:any, methodName:any, paramIndex:any) {
      console.log('logParam11')
  }
}
function logParam22(params?:any) {
  return function(target:any, methodName:any, paramIndex:any) {
      console.log('logParam22')
  }
}

@logClz11('http://baidu.com')
@logClz22()
class HttpClient {
  @logAttr()
  public url:string|undefined;

  constructor() { }

  @logMethod()
  getData() {
      console.log('get data');
  }

  setData(@logParam11() param1:any, @logParam22() param2:any) {
      console.log('set data');
  }
}
// logAttr --> logMethod --> logParam22 --> logParam11 --> logClz22 --> logClz11