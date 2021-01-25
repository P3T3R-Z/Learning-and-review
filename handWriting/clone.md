#### 浅拷贝
创建一个新的对象，把原有对象的属性值，其中包括了基本类型的值，和引用类型的内存地址，完整的拷贝过去。
如果其中一个对象改变了引用类型的内存地址，就会影响到另一个对象。







#### 深拷贝
将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。
简单理解： b 是 a的一份拷贝，b中没有对 a 中对象的引用（b的任意一个对象的属性，都没有引用到 a），那就说明 b 是 a 的 深拷贝。

+ 方法1: JSON.parse,JSON.stringify
 
  缺点
    不支持拷贝函数（会忽略掉函数）
    ```ts
    var a = {
        f: function(){ },
        name: "a"
    }

    var a2 = JSON.parse(JSON.stringify(a))
    console.log(a2) // {name: "a"}

    ```

    不支持所有JSON不支持的类型，如 undefined
    ```ts
    var a = {
        u: undefined,
        name: "a"
    }

    var a2 = JSON.parse(JSON.stringify(a))
    console.log(a2) // {name: "a"}
    ```
    不支持引用
    ```ts
    var a = {
        name: "a"
    }
    a.self = a  //引用自身

    var a2 = JSON.parse(JSON.stringify(a))
    console.log(a2)  //报错
    ```
    不支持 Date
    ```ts
    var a = {
        time: new Date(),
        name: "a"
    }

    var a2 = JSON.parse(JSON.stringify(a))
    console.log(a2)  //输出了日期 new Date()的字符串形式（ISO8601时间字符串格式）
    ```
    不支持正则表达式
    ```ts
    var a = {
        name: "a",
        regex: /hi/
    }

    var a2 = JSON.parse(JSON.stringify(a))
    console.log(a2)  //{name: "a", regex: {}}   输出的是空对象
    ```

    方法2: 递归克隆
    先判断节点类型

    基本类型：直接拷贝
    引用类型（object）：分情况讨论
    ①普通 object : 用 for in ？ 注意， for in 默认会遍历原型上的属性
    ②数组 array
    ③函数 function
    ④日期 Date

     + 基本类型的拷贝

    ```ts
    function deepClone(source) {
    return source
    }
    ```
     + 引用类型的拷贝

     普通对象
    ```ts
    function deepClone(source) {
    if (source instanceof Object) {
        let dist = new Object()
        for (let key in source) {
        dist[key] = deepClone(source[key])
        }
        return dist
    }
    return source
    }
    ```
    数组
    ```ts
    function deepClone(source){
        if(source instanceof Object){
            let dist
            if(source instanceof Array){
                dist = new Array()
            }else{
                dist = new Object()
            }
            for(let key in source){
                dist[key] = deepClone(source[key])
            }
            return dist
        }
        return source
    }
    ```

    函数

    ```ts
    else if (source instanceof Function){
        dist = function () {    //拷贝参数和函数体
            return source.apply(this, arguments)
        }
    }
    ```

    如果遇到环
    环：`window`对象里就有环
    `window.self === window //true`
    代码中用到了递归，如果遇到环，将无法结束递归，该如何解决？
    → 利用缓存标记，通过缓存检查环，如果第一次出现过，第二次再出现将不克隆。
    ```ts
    let cache = []  //初始化
    function deepClone(source){
        if(source instanceof Object){
            let cacheDist = findCache(source)
            if(cacheDist){    //有缓存
                return cacheDist
            }else{     //没缓存
                let dist
                //...(省略)
                cache.push([source, dist])
                for(let key in source){
                    dist[key] = deepClone(source[key])
                }
                return dist
            }
        }
        return source
    }
    //查找缓存
    function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {    //对比 source 返回 dist
        return cache[i][1]
        }
    }
    return undefined
    }
    ```

    Date
    ```ts
    else if (source instanceof Date) {
        dist = new Date(source)
    }
    ```

    RegExp
    ```ts
    else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
    }
    ```

    是否需拷贝原型上的属性

    一般来说，不拷贝原型上的属性，如果拷贝的话，内存占用太多了。
    注意：使用 for in对每个属性克隆时， for in默认会遍历原型上的属性，完善代码：

    ```ts
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            dist[key] = deepClone(source[key])
        }
    }
    ```

    完整代码
    ```ts
    let cache = [] //初始化

    function deepClone(source) {
    //先判断是否是Object类型
    if (source instanceof Object) {
        //判断source是否在缓存里
        let cacheDist = findCache(source)
        if (cacheDist) {   //有缓存
        return cacheDist
        } else {       //没缓存
        let dist
        if (source instanceof Array) {
            dist = new Array()
        } else if (source instanceof Function) {
            dist = function () {
            return source.apply(this, arguments)
            }
        } else if (source instanceof Date) {
            dist = new Date(source)
        } else if (source instanceof RegExp) {
            dist = new RegExp(source.source, source.flags)
        } else {
            dist = new Object()
        }
        cache.push([source, dist])
        //遍历每个属性克隆
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
            dist[key] = deepClone(source[key])
            }
        }
        return dist
        }
    }
    return source
    }

    //查找缓存
    function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
        return cache[i][1]   //对比 source 返回 dist
        }
    }
    return undefined
    }    
    ```