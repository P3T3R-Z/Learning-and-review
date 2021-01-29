class Compiler {
    constructor(el, vm){
        this.el = this.isElementNode(el) ? el : document.querySelector(el)

        this.vm = vm
        //当前节点转文档碎片存入内存
        let fragment = this.node2fragment(this.el)


        //替换节点内容

        //编译模板
        this.compile(fragment)

        //内容塞入页面
        this.el.appendChild(fragment)

    }
    //判断是否存在v-指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //编译元素
    compileElement(node){
        let attributes = node.attributes; //属性 类数组

        [...attributes].forEach(i=>{
            let {name, value:expr} = i;

            //匹配存在指令的节点
           if(this.isDirective(name)){

            let [,directive] = name.split('-');
            //处理不同的指令 v-model v-html v-bind等
            compileUtil[directive](node, expr, this.vm)
        
           }
        })
    }
    
    //编译文本
    compileText(node){
        //判断当前文本节点是否存在{{}}
        let content = node.textContent
        let reg = /\{\{(.+?)\}\}/;

        //匹配花括号文本节点
        if(reg.test(content)){
            compileUtil['text'](node, content, this.vm)
        }
    }
    //编译文档碎片
    compile(node){
        
        let childNodes = node.childNodes;  //第一层节点 !!!
        [...childNodes].forEach(i=>{
            if(this.isElementNode(i)){
                // console.log('元素',i)

                this.compileElement(i)

                //传入自己的子节点
                this.compile(i)

            }else{
                // console.log('文本',i)
                this.compileText(i)
            }
        })
    
    }

    //dom转文档碎片存入内存
    node2fragment(node){
        //创建一个文档碎片
        let fragment = document.createDocumentFragment()
        let firstChild;

        while(firstChild = node.firstChild){
            //appendChild具有移动性, dom移入文档碎片
            fragment.appendChild(firstChild)
        }

        return fragment
    }

    //判断dom
    isElementNode(node){
        return node.nodeType === 1;
    }
}
let compileUtil = {
    //获取$data的数据
    getVal(vm, expr){ //表达式 例: school.name
       return expr.split('.').reduce((data, current)=>{
            return data[current]
        }, vm.$data)
    },
    //node: 节点, expr: 表达式, vm当前实例
    model(node, expr, vm){
        let fn = this.updater['modelUpdater'];
        let value = this.getVal(vm, expr)
        fn(node, value)
    },
    html(){

    },
    text(node, expr, vm){ //expr:  {{a}} {{b}} {{c}}
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
            return this.getVal(vm, args[1])
        })
        fn(node, content)
    },

    updater:{
        //文档碎片赋值
        modelUpdater(node, value){
            node.value = value
        },
        htmlUpdater(){
            
        },

        //处理文本节点
        textUpdater(node, value){
            node.textContent = value
        }
    }
}

class Vue {
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;


        //根几点编译模板
        if(this.$el){
            new Compiler(this.$el, this)
        }
    }
}