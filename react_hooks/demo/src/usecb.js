import React, { useCallback, useEffect, useMemo, useState } from 'react';
//useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能。
// useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，
//useMemo返回缓存的变量，useCallback返回缓存的函数。
export default function example (){
    const [a, seta]=useState({a:1})
    const [b, setb]=useState(1)
    useEffect(()=>{
        console.log('effect')
    },[])
    useMemo(()=>{
        console.log('memo')
    }, [b])
    return (
        <div>
            <p>{a.a}</p>
            <button onClick={()=>seta({a:a.a+1})}>change</button>
            <button onClick={()=>setb(b+1)}>change</button>
        </div>
    )
}