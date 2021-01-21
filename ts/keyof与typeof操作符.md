一、keyof 简介
TypeScript 允许我们遍历某种类型的属性，并通过 keyof 操作符提取其属性的名称。keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
下面我们来看个例子：
```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number
```
除了接口外，keyof 也可以用于操作类，比如：
```ts
class Person {
  name: string = "Semlinker";
}

let sname: keyof Person;
sname = "name";
```
若把 sname = "name" 改为 sname = "age" 的话，TypeScript 编译器会提示以下错误信息：
```ts
Type '"age"' is not assignable to type '"name"'.
```
keyof 操作符除了支持接口和类之外，它也支持基本数据类型：
```ts
let K1: keyof boolean; // let K1: "valueOf"
let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
let K3: keyof symbol; // let K1: "valueOf"
```
此外 keyof 也称为输入索引类型查询，与之相对应的是索引访问类型，也称为查找类型。在语法上，它们看起来像属性或元素访问，但最终会被转换为类型：
```ts
type P1 = Person["name"];  // string
type P2 = Person["name" | "age"];  // string | number
type P3 = string["charAt"];  // (pos: number) => string
type P4 = string[]["push"];  // (...items: string[]) => number
type P5 = string[][0];  // string
```
二、keyof 的作用
JavaScript 是一种高度动态的语言。有时在静态类型系统中捕获某些操作的语义可能会很棘手。以一个简单的prop 函数为例：
```ts
function prop(obj, key) {
  return obj[key];
}
```
该函数接收 obj 和 key 两个参数，并返回对应属性的值。对象上的不同属性，可以具有完全不同的类型，我们甚至不知道 obj 对象长什么样。

那么在 TypeScript 中如何定义上面的 prop 函数呢？我们来尝试一下：
```ts
function prop(obj: object, key: string) {
  return obj[key];
}
```
在上面代码中，为了避免调用 prop 函数时传入错误的参数类型，我们为 obj 和 key 参数设置了类型，分别为 {} 和 string 类型。然而，事情并没有那么简单。针对上述的代码，TypeScript 编译器会输出以下错误信息：
```ts
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'
```
元素隐式地拥有 any 类型，因为 string 类型不能被用于索引 {} 类型。要解决这个问题，你可以使用以下非常暴力的方案：
```ts
function prop(obj: object, key: string) {
  return (obj as any)[key];
}
```
很明显该方案并不是一个好的方案，我们来回顾一下 prop 函数的作用，该函数用于获取某个对象中指定属性的属性值。因此我们期望用户输入的属性是对象上已存在的属性，那么如何限制属性名的范围呢？这时我们可以利用本文的主角 keyof 操作符：
```ts
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```
在以上代码中，我们使用了 TypeScript 的泛型和泛型约束。首先定义了 T 类型并使用 extends 关键字约束该类型必须是 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，其返回类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。 是骡子是马拉出来遛遛就知道了，我们来实际测试一下：
```ts
type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const todo: Todo = {
  id: 1,
  text: "Learn TypeScript keyof",
  done: false
}

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const id = prop(todo, "id"); // const id: number
const text = prop(todo, "text"); // const text: string
const done = prop(todo, "done"); // const done: boolean
```
很明显使用泛型，重新定义后的 prop<T extends object, K extends keyof T>(obj: T, key: K) 函数，已经可以正确地推导出指定键对应的类型。那么当访问 todo 对象上不存在的属性时，会出现什么情况？比如：

`const date = prop(todo, "date");`
对于上述代码，TypeScript 编译器会提示以下错误：

`Argument of type '"date"' is not assignable to parameter of type '"id" | "text" | "done"'.`
这就阻止我们尝试读取不存在的属性。

三、keyof 与对象的数值属性
在使用对象的数值属性时，我们也可以使用 keyof 关键字。请记住，如果我们定义一个带有数值属性的对象，那么我们既需要定义该属性，又需要使用数组语法访问该属性， 如下所示：
```ts
class ClassWithNumericProperty {
  [1]: string = "Semlinker";
}

let classWithNumeric = new ClassWithNumericProperty();
console.log(`${classWithNumeric[1]} `);
```
下面我们来举个示例，介绍一下在含有数值属性的对象中，如何使用 keyof 操作符来安全地访问对象的属性：
```ts
enum Currency {
  CNY = 6,
  EUR = 8,
  USD = 10
}

const CurrencyName = {
  [Currency.CNY]: "人民币",
  [Currency.EUR]: "欧元",
  [Currency.USD]: "美元"
};

console.log(`CurrencyName[Currency.CNY] = ${CurrencyName[Currency.CNY]}`);
console.log(`CurrencyName[36] = ${CurrencyName[6]}`);
```
上面的代码中，首先定义了一个 Currency 枚举用于表示三种货币类型，接着定义一个 CurrencyName 对象，该对象使用数值属性作为键，对应的值是该货币类型的名称。该代码成功运行后，控制台会输出以下结果：
```ts
CurrencyName[Currency.CNY] = 人民币
CurrencyName[36] = 人民币
```
为了方便用户能根据货币类型来获取对应的货币名称，我们来定义一个 getCurrencyName 函数，具体实现如下：
```ts
function getCurrencyName<T, K extends keyof T>(key: K, map: T): T[K] {
  return map[key];
}

console.log(`name = ${getCurrencyName(Currency.CNY, CurrencyName)}`);
```
同样，getCurrencyName 函数和前面介绍的 prop 函数一样，使用了泛型和泛型约束，从而来保证属性的安全访问。最后，我们来简单介绍一下 keyof 与 typeof 操作符如何配合使用。

四、keyof 与 typeof 操作符
typeof 操作符用于获取变量的类型。因此这个操作符的后面接的始终是一个变量，且需要运用到类型定义当中。为了方便大家理解，我们来举一个具体的示例：
```ts
type Person = {
  name: string;
  age: number;
}

let man: Person = {
  name: "Semlinker",
  age: 30
}

type Human = typeof man;
```
了解完 typeof 和 keyof 操作符的作用，我们来举个例子，介绍一下它们如何结合在一起使用：
```ts
const COLORS = {
  red: 'red',
  blue: 'blue'
}

// 首先通过typeof操作符获取color变量的类型，然后通过keyof操作符获取该类型的所有键，
// 即字符串字面量联合类型 'red' | 'blue'

type Colors = keyof typeof COLORS 
let color: Colors;
color = 'red' // Ok
color = 'blue' // Ok

// Type '"yellow"' is not assignable to type '"red" | "blue"'.
color = 'yellow' // Error
```
最后留到思考题，有兴趣的小伙伴可以想一想：
```ts
interface StringIndexArray {
  [index: string]: string;
}

interface NumberIndexArray {
  [index: number]: string;
}

type K1 = keyof StringIndexArray // type K1 = string | number
type K2 = keyof NumberIndexArray // type K2 = number
```

