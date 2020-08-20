function copyFields(target, source) {
    for (var id in source) {
        target[id] = source[id]; // 如果不使用泛型约束，这里会报错
    }
    return target;
}
var x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
