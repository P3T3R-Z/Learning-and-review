import React, {  useState, createContext, useContext } from 'react';

//===关键代码
const CountContext = createContext();
function Example4(){
    const [ count , setCount ] = useState(0);
    return (
        <div>--------------<br/>
            <h1>useContext 让父子组件传值更简单 </h1>
            <h5># createContext 函数创建context</h5>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
            {/*======关键代码 */}
            <CountContext.Provider value={count}>
                <Counter/>
            </CountContext.Provider>
        </div>
    )
}

function Counter(){
    const count = useContext(CountContext) 
    return (<h5>useContext 接收上下文变量{count}</h5>)
}
export default Example4;