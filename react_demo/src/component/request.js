import React, { Component } from "react";
import axios from "axios";
class Axios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "axios请求组件",
      list: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("是否要更新数据", "shouldComponentUpdate");
    console.log("更新时, 父传子的值", nextProps); //更新时, 父传子的值
    console.log("更新后的值", nextState); //更新后的值
    return true; //返回true才更新
  }
  componentWillUpdate() {
    console.log("数据将要更新", "componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("数据更新完成", "componentDidUpdate");
  }
  getdata = () => {
    let _t = this;
    var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20"; //接口后台允许了跨域
    axios
      .get(api)
      .then(res => {
        console.log(res);
        _t.setState({
          list: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h3>{this.state.msg}</h3>
        <button onClick={this.getdata}>无跨域请求</button>
        {/* {this.props.title} */}
        <dl>
          {this.state.list.map((value, key) => {
            return <dd key={key}>{value.title}</dd>;
          })}
        </dl>
      </div>
    );
  }
}

export default Axios;
