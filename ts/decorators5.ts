 

//------------------------------------------------方法参数装饰器
// 传入3个参数
//1.类的原型对象
//2.方法名字
//3.参数索引值


function logParams(params:any){
  console.log(params)  //装饰器传参
  /**
   * http://www.iii.com/api
   * **/
  return function(target:any, methodName:any, paramsIndex:any){
    console.log(target)  //对于静态方法来说是类的构造函数, 对于实例方法是类的原型对象
    /**
     * {getData: ƒ, constructor: ƒ}
     * **/
    console.log(methodName)    //方法名字
    /**
     * getData
     * **/
    console.log(paramsIndex, 'paramsIndex') //参数索引值
    /**
     *  0 'paramsIndex'
     * **/
  
  }
}


class HttpClient5{
   constructor(){

  }

   
  getData(@logParams('uuid') uuid:any){
     console.log('uuid', uuid)
  }
}

var http5 = new HttpClient5()
http5.getData('123123aaa')  
/**
 * 123123aaa
 * **/
 



