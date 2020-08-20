import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aid: ""
    };
  }
  componentDidMount = () => {
    //获取动态路由的传值
    console.log(this.props);
    this.setState({
      aid: this.props.match.params.aid
    });
  };
  render() {
    return (
      <div>
        <br />
        页面news
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}`}
            render={(route) => {
              return <div>这是不带参数页面{route.match.path}</div>;
            }}
          />
           <Route
            exact
            path={`${this.props.match.path}/sub`}
            render={(route) => {
              return <div>这是子路径{route.match.path}</div>;
            }}
          />
          <Route
            path={`${this.props.match.path}/:aid`}
            render={(route) => {
              return <div>这是带参数页面,参数为{route.match.params.aid}</div>;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default News;
