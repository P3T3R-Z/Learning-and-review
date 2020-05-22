Function.prototype.myCall=function(content=window){
    content.fn = this;
    console.log(this,[...arguments].splice(1));
    let args=[...arguments].splice(1);
    let res = content.fn(...args);
    delete content.fn;
    return res;
}