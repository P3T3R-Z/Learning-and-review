import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Drouter extends Component {
  state = {
    msg: "嵌套路由"
  };
  componentDidMount() {
    console.log(this.props.routes); //父级路由传递的 嵌套路由属性
  }
  render() {
    return (
      <Router>
        <div className="pagefix">
          <div className="leftnav">
            <Link to={"/drouter/"}>aa页面</Link>
            <Link to={"/drouter/bb"}>bb页面</Link>
          </div>

          <div className="rightpage">
            {this.props.routes.map((item, index) => {
              return (
                <Route
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </Router>
    );
  }
}

export default Drouter;
