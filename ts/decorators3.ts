
//---------------------------------属性装饰器
//属性装饰器表达式会在运行时当做函数被调用, 传入2个参数
//1. 对于静态属性来说是类的构造函数, 对于实例属性是类的原型对象
//2. 属性名字
function logProperty(params:any){
  console.log(params)  //参数
  /**
   *  http://www.xx.com/api/v1
   * 
   *  true
   * **/
  return function(target:any, attr:any){
    console.log(target)  //对于静态成员来说是类的构造函数, 对于实例成员是类的原型对象
    /**
     * {getData: ƒ, constructor: ƒ}  //原型对象
     * 
     * ƒ HttpClient3() {}  //构造函数
     * **/
    console.log(attr)    //属性名字
    /**
     * apiUrl
     * 
     * init
     * **/
    target[attr] = params //修改
  }
}

class HttpClient3{
  
  @logProperty('http://www.xx.com/api/v1') //-----------属性装饰器,传参
  public apiUrl: string|undefined;

  @logProperty(true)
  static init:boolean = false;
  constructor(){

  }
 
  getData(){
    console.log(this.apiUrl, HttpClient3.init)
  }
}

var http3 = new HttpClient3()
http3.getData()  
/**
 *  http://www.xx.com/api/v1 true
 * **/
 



