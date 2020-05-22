function sendAjax(url,method,data){
    return new Promise((res,rej)=>{
        let xhr = new XMLHttpRequest();
        if(method==='get'){
            xhr.open(get,url+"?"+data,true)
        }else{
            xhr.open(post,url,true)
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(data)
        }
        xhr.onreadystatechange=function(){
            if(xhr.status=200&&xhr.readyState==4){
                let response = xhr.responseText;
                res(JSON.parse(response))
            }else{
                rej(false)
            }
        }
    })
}