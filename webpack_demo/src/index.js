import _ from 'lodash';
//loader=> css-loader  style-loader
// import './style/index.css';  
import './style/a.scss'; 
import label from './8.jpg'

function createDomElement(){
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['这是1', '一个', '测试'], '');
    dom.classList.add('box');
   
    return dom;
}

let divDom = createDomElement();

document.body.appendChild(divDom)
var img=document.createElement("img");
img.src=label;
document.body.appendChild(img)



// babel转es6+
class demo{
    show(){
        console.log('this.age:', this.Age)
    }
    get Age(){
        return this._age;
    }
    set Age(val){
        this._age = val+1
    }
}

let d = new demo();
d.Age = 20;
d.show();

let [a, b, c] = [1,2,3];
console.log(a, b, c)