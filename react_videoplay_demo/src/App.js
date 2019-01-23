import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import routers from "./router/index";

import "antd-mobile/dist/antd-mobile.css";
import "./assets/css/base.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      
      <Router>
        
            <TransitionGroup>
              <CSSTransition
                unmountOnExit
                timeout={1000}
                classNames="fade"
                appear={true}
              >
                <div>
                  {routers.map((item, index) => {
                    if (item.exact) {
                      return (
                        <Route
                          exact
                          path={item.path}
                          key={index}
                          component={item.component}
                        />
                      );
                    } else {
                      return (
                        <Route
                          path={item.path}
                          key={index}
                          component={item.component}
                        />
                      );
                    }
                  })}
                  
                </div>
              </CSSTransition>
            </TransitionGroup>
          
      </Router>
    );
  }

  componentWillMount() {
    console.log("组件将要挂载", "componentWillMount");
  }
  componentDidMount() {
    console.log("app------------", this);
    console.log("组件挂载完成", "componentDidMount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("是否要更新数据", "shouldComponentUpdate");
    console.log("更新时, 父传子的值", nextProps); //数据更新时, 组件传值
    console.log("更新后的值", nextState); //更新后的值
    return true;
  }
  componentWillUpdate() {
    console.log("数据将要更新", "componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("数据更新完成", "componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("组件销毁", "componentWillUnmount");
  }
  componentWillReceiveProps() {
    console.log("父传子值改变时触发的方法", "componentWillReceiveProps");
  }
}

export default App;

// 用于渲染单层路由
// component={item.component}

// 用于渲染嵌套路由
// render={props => (
//   <item.component {...props} routes={item.routes} />
// )}
