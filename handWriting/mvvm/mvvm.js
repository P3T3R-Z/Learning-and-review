//被观察者
class Dep{
    constructor(){
        this.subs = []; //存放所有watcher
    }
    //订阅
    addSub(watcher){
        this.subs.push(watcher)
    }
    //发布
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}
// 观察者
class Watcher {
    constructor(vm, expr, cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        //默认先存放一个老值
        this.oldValue = this.get()
    }
    get(){
        Dep.target = this; //存入自身实例, 等待取值defineProperty时插入订阅队列中
        let value = CompileUtil.getVal(this.vm, this.expr)
        Dep.target = null;
        return value
    }
    update(){
        //更新操作 数据变化后会调用观察者的update
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if(newVal !== this.oldValue){
            this.cb(newVal)
        }
    }
}

class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data === "object") {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    //若含有对象则继续定义defineProperty
    this.observer(value);

    //给每一个属性都加上具有订阅发布的功能
    let dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set: (newVal) => {
        if (newVal != value) {
          //赋值了新对象则继续定义defineProperty
          this.observer(newVal);
          value = newVal;

          dep.notify()
        }
      },
    });
  }
}
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    this.vm = vm;
    //当前节点转文档碎片存入内存
    let fragment = this.node2fragment(this.el);

    //替换节点内容

    //编译模板
    this.compile(fragment);

    //内容塞入页面
    this.el.appendChild(fragment);
  }
  //判断是否存在v-指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  //编译元素
  compileElement(node) {
    let attributes = node.attributes; //属性 类数组

    [...attributes].forEach((i) => {
      let { name, value: expr } = i;

      //匹配存在指令的节点
      if (this.isDirective(name)) {
        let [, directive] = name.split("-");

        //处理 v-on:click
        let [directiveName, eventName] = directive.split(':')


        //处理不同的指令 v-model v-html v-bind等
        CompileUtil[directiveName](node, expr, this.vm, eventName);
      }
    });
  }

  //编译文本
  compileText(node) {
    //判断当前文本节点是否存在{{}}
    let content = node.textContent;
    let reg = /\{\{(.+?)\}\}/;

    //匹配花括号文本节点
    if (reg.test(content)) {
      CompileUtil["text"](node, content, this.vm);
    }
  }
  //编译文档碎片
  compile(node) {
    let childNodes = node.childNodes; //第一层节点 !!!
    [...childNodes].forEach((i) => {
      if (this.isElementNode(i)) {
        // console.log('元素',i)

        this.compileElement(i);

        //传入自己的子节点
        this.compile(i);
      } else {
        // console.log('文本',i)
        this.compileText(i);
      }
    });
  }

  //dom转文档碎片存入内存
  node2fragment(node) {
    //创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;

    while ((firstChild = node.firstChild)) {
      //appendChild具有移动性, dom移入文档碎片
      fragment.appendChild(firstChild);
    }

    return fragment;
  }

  //判断dom
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
let CompileUtil = {
  //根据表达式获取对应的数据
  getVal(vm, expr) { //vm.$data   'school.name'  [school.name]
    return expr.split(".").reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  setValue(vm, expr, value){ //vm.$data   'school.name' = 'xx'
    expr.split(".").reduce((data, current, index, arr) => {
        if(arr.length-1 == index){
            data[current] = value
        }
        return data[current];
    }, vm.$data);
  },
  //node: 节点, expr: 表达式, vm当前实例
  //输入框赋值val node.val=xxx
  model(node, expr, vm) {
    let fn = this.updater["modelUpdater"];

    //给输入框加一个观察者, 如果稍后数据更新了会触发此方法, 会拿新值 给输入框赋予值
    new Watcher(vm, expr, (newVal)=>{
        fn(node, newVal);
    })

    node.addEventListener('input', e=>{
        let value = e.target.value //获取用户输入的内容

        this.setValue(vm,expr,value)
    })

    let value = this.getVal(vm, expr, (newVal)=>{
        fn(node, newVal);
    });
    fn(node, value);
  },
  html(node, expr, vm) {
    let fn = this.updater["htmlUpdater"];

    new Watcher(vm, expr, (newVal)=>{
        fn(node, newVal);
    })
    let value = this.getVal(vm, expr)

    fn(node, value)
  },

  getContentValue(vm, expr){
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return this.getVal(vm, args[1])
    })
  },

  //文本处理
  text(node, expr, vm) {
    //expr:  {{a}} {{b}} {{c}}
    let fn = this.updater["textUpdater"];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

        //给表达式每个{{}} 都加上观察者
        new Watcher(vm, args[1], (newVal)=>{
            fn(node, this.getContentValue(vm, expr)) //返回一个全的字符串
        })

      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },

  on(node, expr, vm, eventName){ //v-on:click="change"
    node.addEventListener(eventName, (e)=>{
        vm[expr].call(vm, e)
    })
  },

  updater: {
    //文档碎片赋值
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater(node, value) {
        node.innerHTML = value
    },

    //处理文本节点
    textUpdater(node, value) {
      node.textContent = value;
    },
  },
};

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    
    let computed = options.computed;
    let methods = options.methods;

    //把数据全部转化为Object.defineProperty来定义
    new Observer(this.$data);

    //把数据获取操作 vm上的取值操作都代理到vm.$data
    this.proxyVm(this.$data)


    //处理computed
    for(let key in computed){
        Object.defineProperty(this.$data, key, {
            get:()=>{
                return computed[key].call(this)
            }
        })
    }

    //methods处理到实例中
    for(let key in methods){
        Object.defineProperty(this, key, {
            get:()=>{
                return methods[key]
            }
        })
    }

    //根几点编译模板
    if (this.$el) {
      new Compiler(this.$el, this);
    }
  }

  proxyVm(data){
      for(let key in data){
          Object.defineProperty(this, key, {
              get(){
                  return data[key]
              },
              set(val){
                  data[key] = val
              }
          })
      }
  }
}
