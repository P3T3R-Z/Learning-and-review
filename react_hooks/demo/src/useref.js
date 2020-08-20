import React, { useRef } from 'react';
export default function example8(){
    const inputEl=useRef(null);
    const onButtonclick = ()=>{
        inputEl.current.value='hello world';
        console.log(inputEl)       //输出dom节点
    }

    return (
        <div>
            <input type="text" ref={inputEl} />
            <button onClick={onButtonclick}>useref</button>
        </div>
    )
}