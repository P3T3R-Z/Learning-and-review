//仿造es6的set map类的方法
function Set(arr = []) {
    let items = {};
    this.size = 0;
    // has方法
    this.has = function (val) {
        return items.hasOwnProperty(val);
    };
    // add方法
    this.add = function (val) {
        // 如果没有存在items里面就可以直接写入
        if (!this.has(val)) {
            items[val] = val;
            this.size++;
            return true;
        }
        return false;
    };
    arr.forEach((val, i) => {
        this.add(val);
    });
    // delete方法
    this.delete = function (val) {
        if (this.has(val)) {
            delete items[val];  // 将items对象上的属性删掉
            this.size--;
            return true;
        }
        return false;
    };
    // clear方法
    this.clear = function () {
        items = {};
        this.size = 0;
    };
    // keys方法
    this.keys = function () {
        return Object.keys(items);
    };
    // values方法
    this.values = function () {
        return Object.values(items);
    }
    // forEach方法
    this.forEach = function (fn, context = this) {
        for (let i = 0; i < this.size; i++) {
            let item = Object.keys(items)[i];
            fn.call(context, item, item, items);
        }
    }
 
    // 并集
    this.union = function (other) {
        let union = new Set();
        let values = this.values();
 
        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }
        values = other.values();    // 将values重新赋值为新的集合
        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }
 
        return union;
    };
    // 交集
    this.intersect = function (other) {
        let intersect = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (other.has(values[i])) {
                intersect.add(values[i]);
            }
        }
        return intersect;
    };
    // 差集
    this.difference = function (other) {
        let difference = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!other.has(values[i])) {
                difference.add(values[i]);
            }
        }
        return difference;
    };
    // 子集
    this.subset = function(other) {
        if (this.size > other.size) {
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                console.log(values[i])
                console.log(other.values())
                if (!other.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    };
}
 

function Map() {
    let items = {};
    this.size = 0;
 
    // 操作方法
    // has方法
    this.has = function(val) {
        return items.hasOwnProperty(val);
    };
    // set(key, val)方法
    this.set = function(key, val) {
        items[key] = val;
        this.size++;
    };
    // get(key)方法
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };
    // delete(key)方法
    this.delete = function(key) {
        if (this.has(key)) {
            delete items[key];
            this.size--;
            return true;
        }
        return false;
    };
    // clear()方法
    this.clear = function() {
        items = {};
        this.size = 0;
    };
    // 遍历方法
    // keys()方法
    this.keys = function() {
        return Object.keys(items);
    };
    // values()方法
    this.values = function() {
        return Object.values(items);
    };
    // forEach(fn, context)方法
    this.forEach = function(fn, context = this) {
        for (let i = 0; i < this.size; i++) {
            let key = Object.keys(items)[i];
            let value = Object.values(items)[i];
            fn.call(context, value, key, items);
        }
    };
}
 
module.exports = {
    Set,
    Map
}