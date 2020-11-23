let fibonacci1: number[] = [1, 1, 2, 3, 5];  //「类型 + 方括号」表示法
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];  //数组泛型
interface NumberArray {
    [index:number]:number
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5]; //用接口表示数组§

//类数组 例如参数
function sum2(){
    let args:{
        [index:number]: number;
        length:number;
        callee:Function;
    }= arguments;
}
