  
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]; // 如果不使用泛型约束，这里会报错
    }
    return target;
  }
  
  let x = { a: 1, b: 2, c: 3, d: 4 };
  
  copyFields(x, { b: 10, d: 20 });