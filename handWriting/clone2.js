//深度克隆: 浅拷贝+类型判断+递归浅拷贝 

//防栈溢出
/*
用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象

然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝
*/
function cloneDeep5(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 广度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}



//https://github.com/yygmind/blog/issues/29
//递归拷贝,支持symbol,Array,Object
function cloneDeep4(source, hash = new WeakMap()) {

    if (!isObject(source)) return source; 
    if (hash.has(source)) return hash.get(source); 
      
    let target = Array.isArray(source) ? [...source] : { ...source }; // 改动 1
    hash.set(source, target);
    
  	Reflect.ownKeys(target).forEach(key => { // 改动 2
        if (isObject(source[key])) {
            target[key] = cloneDeep4(source[key], hash); 
        } else {
            target[key] = source[key];
        }  
  	});
    return target;
}