import "./style.css";
import logo from "./image/demo-logo.png"
import {
    cube
} from "./math.js"
import _ from 'lodash';

console.log(_.join(['1', '2', '3']), '')

function component() {

    var el2 = document.createElement('pre');
    el2.innerHTML = "5 cube is equal to " + cube(5)
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


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}