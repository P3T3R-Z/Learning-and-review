function throttle(fn,time){
    let timer=0;
    if(!timer){
        timer = setTimeout(
            fn.apply(this),time
        )
    }
}