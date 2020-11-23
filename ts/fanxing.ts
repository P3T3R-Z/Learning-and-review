//泛型: 可以支持不特定的数据类型, 要求:传入的参数和返回的参数一致

//T标识泛型, 具体什么类型是调用这个方法时候决定的
function getData<T>(value: T): T {
  return value;
}

getData<number>(123);
getData<string>("asd");



//只支持数字类型
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

let s = new Minclass()
s.add(1)
s.add(2)
console.log(s.min) // 1
//---------------------------泛型类
class Minclass2<T> {
    public list: T[] = [];
    add(num: T):void{
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

  let m1 = new Minclass2<number>()
  m1.add(11)
  m1.add(2)
  console.log(m1.min) // 2