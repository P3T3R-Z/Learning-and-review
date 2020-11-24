//类装饰器
//-------------------------------------普通装饰器 不传参

function logclass(params:any){
  console.log(params)//params就是当前类的构造函数
  /**
   * f HttpClient() {}  //构造函数
   * **/
  
  //修改原型上的属性
  params.prototype.apiUrl = 'xxx'
}



@logclass
class HttpClient{

  public apiUrl: string|undefined;

  constructor(){

  }

  getData(){
    console.log(this.apiUrl)
  }
}

var http = new HttpClient()
http.getData()  
/**
 * 'xxx'
 * **/
 



//---------------------------------------装饰器工厂 可以传参
function logclass2(params:string){
  console.log(params)  //当前参数
  /**
   * http://api.xxx.com
   * **/
  return function(target:any){
    console.log(target)  //当前类的构造函数
     /**
     * f HttpClient2() {}  //构造函数
     * **/
    target.prototype.getData=function(){  //可以修改构造函数的方法或者属性
      console.log(2)
    }
  }
}

//----------------------普通装饰器
@logclass2('http://api.xxx.com')
class HttpClient2{
  constructor(){

  }
  getData(){
    console.log(1)
  }
}
 
let http2 = new HttpClient2()
http2.getData()//2




//--------------------------类装饰器修改类的属性,方法
function change(params:any){
  return class extends params {
    apiUrl:any='我是修改后的apiurl';
    
    getData(){
      this.apiUrl = this.apiUrl+'++++++'
      console.log('我是装饰器getdata修改后的apiurl',this.apiUrl)
    }
  }
}

@change
class HttpClient_c{
  
  public apiUrl:string|undefined;
  constructor(){
    this.apiUrl = '我是构造函数里面的apiurl'
  }
  getData(){
    console.log(this.apiUrl)
  }
}


var http3 = new HttpClient_c();
http3.getData()
/**
 * 我是装饰器getdata修改后的apiurl 我是修改后的apiurl++++++
 * **/



//装饰器执行顺序
//  属性->方法->方法参数->类
// 多个同级装饰器,首先执行后面的