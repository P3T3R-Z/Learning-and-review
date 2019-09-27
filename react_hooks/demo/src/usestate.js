import React, { useState } from 'react';

function Example(){
    const [count, setCount]=useState(0);
    return (
        <div>
            useState:
            <p>clicked {count} times</p>
            <button onClick={()=>setCount(count+1)}>click</button>
        </div>
    )
}
export default Example