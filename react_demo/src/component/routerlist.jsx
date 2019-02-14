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
        <Link to="/router/news/">匹配news</Link><br/>
        <Link to="/router/news/sub">匹配news 子路径</Link><br/>
        <Link to="/router/news/1">匹配news 带参数(动态路由)</Link><br/>
        <br/>
        <Link to="/router/news2?aid=2">路由get传值</Link><br/>
        <button onClick={this.redirt}>js路由跳转</button>

        <div>
          <Route path="/router/news" component={News} />
          <Route path="/router/news2" component={News2} />
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



//<BrowserRouter> / <HashRouter> 路由方式
// <Route> 路由规则
// <Swtich> 路由选项
// <Link>/<NavLink> 跳转导航
// <Redirect> 自动跳转


//匹配不带参数,子路径,带参数动态路由页面详情前三个