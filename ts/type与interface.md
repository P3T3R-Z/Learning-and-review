#### type interface区别
```ts
interface User {
 name: string
 age: number
}

interface SetUser {
 (name: string, age: number): void;
}
```

```ts
type User = {
 name: string
 age: number
};

type SetUser = (name: string, age: number): void;
```
#### 相同点
+ 都允许拓展（extends）

interface extends interface
```ts
interface Name { 
 name: string; 
}
interface User extends Name { 
 age: number; 
}
```
type extends type
```ts
type Name = { 
 name: string; 
}
type User = Name & { age: number };
```
interface extends type
```ts
type Name = { 
 name: string; 
}
interface User extends Name { 
 age: number; 
}
```
type extends interface
```ts
interface Name { 
 name: string; 
}
type User = Name & { 
 age: number; 
}
```

#### 区别
1. type 可以声明基本类型别名，联合类型，元组等类型, interface 不行

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
 wong();
}
interface Cat {
 miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```
2. type 语句中还可以使用 typeof 获取实例的 类型进行赋值
```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```
3. type 支持类型映射，interface不支持
```ts
type Keys = "firstname" | "surname"

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek"
}

// 报错
//interface DudeType {
//  [key in keys]: string
//}
```
3.1. 其他骚操作
```ts
type StringOrNumber = string | number; 
type Text = string | { text: string }; 
type NameLookup = Dictionary<string, Person>; 
type Callback<T> = (data: T) => void; 
type Pair<T> = [T, T]; 
type Coordinates = Pair<number>; 
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

4. interface 能够声明合并
```ts
interface User {
 name: string
 age: number
}

interface User {
 sex: string
}

/*
User 接口为 {
 name: string
 age: number
 sex: string 
}
*/
```
5. 多态 this 类型

```ts
interface AddsStrings {
  add(str: string): this;
};

class StringBuilder implements AddsStrings {
  result = '';
  add(str: string) {
    this.result += str;
    return this;
  }
}
```
一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。其他更多详情参看