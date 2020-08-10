function identity<T>(arg: T): T {
    return arg;
}
/*
我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），
之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。
*/

//usage 1
let output = identity<string>("myString");  // type of output will be 'string'
//usage 2
let output2 = identity("myString");  // type of output will be 'string'


///-------------------------------------------------泛型变量
function fx1<T>(arg:T):T{
    return arg
}

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
//-------------------------------------------泛型类型
function identity3<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity3;

///----------------------------------泛型接口
interface GenericIdentityFn0 {
    <T>(arg: T): T;
}

function identity0<T>(arg: T): T {
    return arg;
}

let myIdentity0: GenericIdentityFn0 = identity0;


//-------------------------------------泛型接口指定参数类型
interface ii<T> {
    (arg: T): T
}
function id<T>(arg:T):T{
    return arg
}
let myid: ii<number>=id

//------------------------------------泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

//------------------------------泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity_ys<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity_ys('22')