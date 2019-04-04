import _ from 'lodash';
import "./style.css";
import logo from "./image/demo-logo.png"

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var demologo = new Image();
    demologo.src = logo
    element.appendChild(demologo);
    return element;
}

document.body.appendChild(component());