 

//------------------------------------------------方法装饰器
// 用于监视,修改,替换方法定义, 传入3个参数
//1.对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
//2.方法名字
//3.方法属性描述符


function logMethod(params:any){
  console.log(params)  //装饰器传参
  /**
   * http://www.iii.com/api
   * **/
  return function(target:any, methodName:any, desc:any){
    console.log(target)  //对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
    /**
     * {getData: ƒ, constructor: ƒ}
     * **/
    console.log(methodName)    //方法名字
    /**
     * getData
     * **/
    console.log(desc, 'desc') //方法属性描述符
    /**
     * {writable: true, enumerable: true, configurable: true, value: ƒ}
     * **/
    
    //-----------修改装饰器的方法, 把装饰器方法的参数改为string类型
    var pMethod=desc.value;  //记录原来的方法
    desc.value = function(...args:any[]){
      args = args.map(i=>{
        return String(i)
      })
      pMethod.apply(this, args)
      console.log(this) //this指向类的示例对象
    }
    
  }
}


class HttpClient4{
   constructor(){

  }

  @logMethod('http://www.iii.com/api') //装饰器传参
  getData(...args:any[]){
    console.log(args)
  }
}

var http4 = new HttpClient4()
http4.getData(1,2,4,'xx')  
 /**
  * ["1", "2", "4", "xx"]
  * **/



