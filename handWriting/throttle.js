//设置一个阀值，在阀值内，把触发的事件合并成一次执行；当到达阀值，必定执行一次事件
var throttleV2 = function(action, delay){
    var statTime = 0;
    
    return function() {
        var currTime = +new Date();
        
        if (currTime - statTime > delay) {
            action.apply(this, arguments);
            statTime = currTime ;
        }
    }
}    

// example
function resizeHandler() {
    console.log("resize");
}

window.onresize = throttleV2(resizeHandler, 300);