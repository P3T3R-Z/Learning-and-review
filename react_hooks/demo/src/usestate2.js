import React, { useState } from "react";
function Example2() {
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState("男");
  const [work, setWork] = useState("c");
  return (
    <div>--------------<br/>
      <h1>      useState: 多状态声明的注意事项
</h1>
      在使用useState的时候只赋了初始值，并没有绑定任何的key,那React是怎么保证这三个useState找到它自己对应的state呢？<br/>
      答案是：React是根据useState出现的顺序来确定的
      <p>a 今年:{age}岁</p>
      <p>b:{sex}</p>
      <p>c:{work}</p>
    </div>
  );
}
export default Example2;

// 就是React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序

// import React, { useState } from 'react';

// let showSex = true
// function Example2(){
//     const [ age , setAge ] = useState(18)
//     if(showSex){
//         const [ sex , setSex ] = useState('男')
//         showSex=false
//     }

//     const [ work , setWork ] = useState('aa')
//     return (
//         <div>
//             <p>a 今年:{age}岁</p>
//             <p>b:{sex}</p>
//             <p>c:{work}</p>

//         </div>
//     )
// }
// export default Example2;
