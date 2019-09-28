import React, { useReducer } from 'react';

function ReducerDemo(){
    const [ count , dispatch ] =useReducer((state,action)=>{   //useReducer必须写入函数中
        switch(action){
            case 'add':
                return state+1
            case 'sub':
                return state-1
            default:
                return state
        }
    }, 999) //第一个参数为控制状态, 第二个参数为初始状态
    return (
       <div>-----------<br/>
           <h1>useReducer</h1>
           <p>现在的分数是{count}</p>
           <button onClick={()=>dispatch('add')}>Increment</button>
           <button onClick={()=>dispatch('sub')}>Decrement</button>
       </div>
    )

}

export default ReducerDemo