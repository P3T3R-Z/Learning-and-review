//把触发非常频繁的事件合并成一次执行
var debounce = function(action, delay) {
    var timer = null;
    
    return function() {
        var self = this, 
              args = arguments;
              
        clearTimeout(timer);
        timer = setTimeout(function() {
            action.apply(self, args)
        }, delay);
    }
}

// example
function resizeHandler() {
    console.log("resize");
}

window.onresize = debounce(resizeHandler, 300);