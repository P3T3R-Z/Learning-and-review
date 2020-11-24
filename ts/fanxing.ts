//泛型: 可以支持不特定的数据类型, 要求:传入的参数和返回的参数一致

//T标识泛型, 具体什么类型是调用这个方法时候决定的

function getData<T>(value: T): T {
  return value;
}

getData<number>(123);
getData<string>("asd");

//----------------------------------------检验参数为number类型
class Minclass {
  public list: number[] = [];
  add(num: number) {
    this.list.push(num);
  }
  min(): number {
    var minnum = this.list[0];
    this.list.forEach((i) => {
      if (minnum > i) {
        minnum = i;
      }
    });
    return minnum;
  }
}

let s = new Minclass();
s.add(1);
s.add(2);
console.log(s.min); // 1
//---------------------------------------------------泛型类, 动态检验类的参数类型和返回类型
class Minclass2<T> {
  public list: T[] = [];
  add(num: T): void {
    this.list.push(num);
  }
  min(): T {
    var minnum = this.list[0];
    this.list.forEach((i) => {
      if (minnum > i) {
        minnum = i;
      }
    });
    return minnum;
  }
}

let m1 = new Minclass2<number>();
m1.add(11);
m1.add(2);
console.log(m1.min); // 2

//------------------------------------------------------泛型类, 将类当做泛型,去检验类的参数
class User {
  userName: string | undefined;
  password: string | undefined;
}
class mysqlDb<T> {
  add(info: T): boolean {
    console.log(info);
    return true;
  }
}
var u = new User();
u.userName = "张三";
u.password = "123456";

var Db = new mysqlDb<User>(); //-------------检验参数为User泛型
Db.add(u);


//定义ArticleCate 用于校验mysqlDb类传入的参数
class ArticleCate {
  title: string | undefined;
  desc: string | undefined;
  status: boolean | undefined;

  constructor(params: {
    title: string | undefined;
    desc: string | undefined;
    status?: boolean | undefined;
  }) {
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }
}
var a = new ArticleCate({
  title: '老王的发展史',
  desc: '老王的发展史',
  status: true,
})
var Db2 = new mysqlDb<ArticleCate>();  //-------------检验参数为ArticleCate泛型
Db2.add(a);




//------------------------------泛型接口
interface DBI<T> {
  add(info: T):boolean;
  update(info: T, id:number):boolean;
  delete(id: number):boolean;
  get(id: number):any[];
}
//-----------------------------类实现接口
class MysqlDb<T> implements DBI<T>{
  add(info: T): boolean {
    console.log(info)
    return true
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }
}

class Users {
  username: string|undefined;
  password: string|undefined;
}

var users = new Users()
users.username = '老实人'
users.password = '123123';

var oMysqldb = new MysqlDb<Users>(); //Users作为泛型检验MysqlDb的数据
oMysqldb.add(users)