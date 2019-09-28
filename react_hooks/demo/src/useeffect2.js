import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  useEffect(() => {
    console.log("---->Index页面");
    return ()=>{
        console.log('Index页面---->')
    }
  },[]);
  return <h2>Index页面</h2>;
}

function List() {
  useEffect(() => {
    console.log("---->List页面");
    return ()=>{
        console.log('List页面---->')
    }
  },[]);

  return <h2>List页面</h2>;
}

function example4() {
  const [ count , setCount ] = useState(0);

  useEffect(()=>{
      console.log(`useEffect=>You clicked ${count} times`)

      return ()=>{
          console.log('====================')
      }
  },[count])
  return (
    <div>
      -------------- <br/>
      <h1>useEffect解绑</h1>
      相当于执行componentWillUnmount
      useEffect 返回一个函数的形式进行解绑, useEffect第二个参数填入数组,数组中为解绑的数据
      <p>You clicked {count} times</p>
      <button onClick={()=>{setCount(count+1)}}>click me</button>
      点击后触发useeffect副作用,同时执行解绑 看console.log
      <br />
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list/">列表</Link>
          </li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" component={List} />
      </Router>
    </div>
  );
}
export default example4;
