//---------------------------------类装饰器

function logclass(params:any){
  console.log(params)
  //params就是当前类的构造函数
  
  //修改原型上的属性
  params.prototype.apiUrl = 'xxx'
}

//---------------------------------属性装饰器
//属性装饰器表达式会在运行时当做函数被调用, 传入2个参数
//1. 对于静态属性来说是类的构造函数, 对于实例属性是类的原型对象
//2. 属性名字
function logProperty(params:any){
  console.log(params)  //参数
  return function(target:any, attr:any){
    console.log(target)  //对于静态成员来说是类的构造函数, 对于实例成员是类的原型对象
    console.log(attr)    //属性名字
    target[attr] = params
  }
}

//----------------------普通装饰器
@logclass
class HttpClient{
  //-----------属性装饰器,传参
  @logProperty('http://www.xx.com/api/v1')
  public apiUrl: string|undefined;

  @logProperty(false)
  static init:boolean = false;
  constructor(){

  }
  getData(){
    console.log(this.apiUrl, 3, HttpClient.init)
  }
}

var http = new HttpClient()
http.getData() //"xxx",  3,  false
 



//-----------------------------装饰器工厂
function logclass2(params:string){
  console.log(params)  //当前参数
  return function(target:any){
    console.log(target)  //当前类的构造函数
    
  }
}

//----------------------普通装饰器
@logclass2('http://api.xxx.com')
class HttpClient2{
  constructor(){

  }
  getData(){

  }
}
 

//--------------------------装饰器修改类的属性,方法
function logclass3(params:any){
  return class extends params {
    apiUrl:any='我是修改后的apiurl';

    getData(){
      this.apiUrl = this.apiUrl+'++++++'
      console.log('我是装饰器getdata修改后的apiurl',this.apiUrl)
    }
  }
}

@logclass3
class HttpClient3{
  public apiUrl:string|undefined;
  constructor(){
    this.apiUrl = '我是构造函数里面的apiurl'
  }
  getData(){
    console.log(this.apiUrl)
  }
}


var http3 = new HttpClient3();
// http3.getData()