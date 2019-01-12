import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import News from "./routerlist/news";
import News2 from "./routerlist/news2";
class Routerlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  render() {
    if (this.state.flag === true) {
      console.log("js路由跳转了");
      return <Redirect to={{ pathname: "/form" }} />;
    }
    return (
      <div>
        <Link to="/router/newsa/1">动态路由</Link>
        <Link to="/router/news">路由get传值</Link>
        <button onClick={this.redirt}>js路由跳转</button>

        <div>
          <Route path="/router/newsa/:aid" component={News} />
          <Route path="/router/news" component={News2} />
        </div>
      </div>
    );
  }
  redirt = () => {
    this.setState({
      flag: true
    });
  };
}

export default Routerlist;
