var read = function(name){
    return new Promise(resolve=>{
        
        setTimeout(function(){resolve(name); } ,2000)
    })
}


function * a(){
    yield read("a")
    yield read("b")

}

var t=a();
async function next(){
    var run=t.next()
   if(run.done){
      setTimeout(()=>{ console.log(3)},2000)
   }else{
        var data=await run.value;
        console.log(data)
        next()
   }


}
next()