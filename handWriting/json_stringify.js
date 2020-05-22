function jsonStringify(obj) {
    let type = typeof (obj);
    if (type !== 'object') {
        if (type === 'function') {
            return;
        }
        return String(obj)
    } else {
        let isArr = Array.isArray(obj),arrJson = [];
        for (let k in obj) {
            let v = obj[k];let type = typeof(v);
            if (type !== 'object') {
                if (type === 'function') {
                    v = null;
                }
                v = String(v)
            }else{
                v=jsonStringify(v)
            }
            arrJson.push(isArr?k:(k+':')+v)
        }
        return (isArr ? '[':'{') + String(arrJson) +(isArr ? ']':'}');
    }
}