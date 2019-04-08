
import "./style.css";
import logo from "./image/demo-logo.png"
import {cube} from "./math.js"

function component() {

    var el2 = document.createElement('pre');
    el2.innerHTML = "5 cube is equal to "+ cube(5)
    el2.classList.add('hello');
    return el2;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}