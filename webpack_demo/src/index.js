import _ from 'lodash';
//loader=> css-loader  style-loader
// import './style/index.css';  
import './style/a.scss'; 

function createDomElement(){
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['这是', '一个', '测试'], '');
    dom.classList.add('box')
    return dom;
}

let divDom = createDomElement();

document.body.appendChild(divDom)