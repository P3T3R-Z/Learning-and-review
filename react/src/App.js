import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
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
            <Link to="/todolist">todolist组件</Link>
            <Link to="/axios">axios组件</Link>
            <Link to="/fetchjson">fetchjsonp组件</Link>
            <Link to="/life">组件生命周期</Link>
            <Link to="/router">react路由</Link>
            <Link to="/drouter">嵌套路由</Link>
            <Link to="/antdpage">antd组件</Link>
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