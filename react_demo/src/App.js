import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
//import 'antd/dist/antd.css';
import "antd/dist/antd.less"; 


import "./assets/css/App.css";
import routers from "./router/router"; //路由模块

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "app父组件数据"
    };
  }

  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <Link to="/">jsx基础语法</Link>
            <Link to="/form">react表单组件</Link>
            <Link to="/todolist">todolist</Link>
            <Link to="/axios">请求</Link>
            <Link to="/life">生命周期</Link>
            <Link to="/router">react路由</Link>
            <Link to="/drouter">嵌套路由</Link>
            <Link to="/antdpage">antd</Link>
            <Link to="/trans">动画组件</Link>
            <Link to="/rd">redux</Link>
            <Link to="/rdt">redux-thunk</Link>
            <Link to="/rds">redux-saga</Link>
          </div>

          {routers.map((item, index) => {
            if (item.exact) {
              return (
                <Route exact path={item.path} key={index}
                  render={props => (
                    <item.component {...props} routes={item.routes} />
                  )}
                />
              );
            } else {
              return (
                <Route path={item.path}  key={index}
                  render={props => (
                    <item.component {...props} routes={item.routes} />
                  )}
                />
              );
            }
          })}
        </div>
      </Router>
    );
  }
}

export default App;



// 用于渲染单层路由
// component={item.component}

// 用于渲染嵌套路由
// render={props => (
//   <item.component {...props} routes={item.routes} />
// )}