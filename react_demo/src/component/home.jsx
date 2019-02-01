import React, { Component } from "react";
import Header from "./header";
import logo from "../assets/images/logo.svg";
import "../assets/scss/index.scss"
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "home父组件数据",
      style: {
        color: "red",
        fontSize: "16px"
      },
      list: [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>],
      list2: [1, 2, 3, 4, 5],
      msg: "事件传值",
      inputval: "",
      inputval2: "",
      bindval: "数据双向绑定",
      num: false //用于验证传值
    };
    this.getMsg3 = this.getMsg3.bind(this); //事件指定this
  }

  render() {
    return (
      <div className="App">
        <a>npm i node-sass 编译sass</a>
        <p>jsx图片模块引入</p>
        <img src={logo} className="App-logo" alt="logo" />
        {/*循环: 变量绑定样式*/}
        <div style={this.state.style}>变量绑定样式</div>
        {/*循环: 类名样式绑定*/}
        <div className="blue">类名样式绑定</div>
        {/*循环: 行内样式绑定*/}
        <div style={{ color: "blue", fontStyle: "italic" }}>行内样式绑定</div>
        {/*循环: htmlFor用法*/}
        <label htmlFor="names">htmlFor用法</label>
        <input type="checkbox" id="names" />
        <p>jsx直接渲染数组</p>
        <ul>{this.state.list}</ul>
        <p>map遍历返回数组渲染</p>
        <ul>
          {this.state.list2.map((i, index) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        {/*this指向*/}
        <button onClick={this.getMsg}>指向this方法1</button>
        <button onClick={this.getMsg2.bind(this)}>指向this方法2</button>
        <button onClick={this.getMsg3}>指向this方法3</button>
        {/*设置state*/}
        <button onClick={this.changedata}>改变state</button>
        {/*事件传值*/}
        <button onClick={this.changedata2.bind(this, "123")}>
          {this.state.msg}
        </button>
        <br />
        {/*事件对象获取值*/}
        <input onChange={this.inputchange} />
        <button onClick={this.getInputval}>事件对象获取input值</button>
        <br />
        {/*ref获取dom节点*/}
        <input onChange={this.inputchange2} ref="aaa" />
        <button onClick={this.getInputval2}>ref获取input值</button>
        <br />
        <input
          onKeyUp={this.getkeyword}
          onKeyDown={this.getkeydown}
          placeholder="键盘事件获取"
        />
        <br />
        <input onChange={this.changeBind} value={this.state.bindval} />
        <p>{this.state.bindval}</p>
        <h3>父子组件传值</h3>
        {/*在调用子组件的时候定义一个属性,用于传递*/} {/*ref用于获取子组件dom*/}
        <Header
          run={this.run}
          title={this.state.title}
          all={this}
          num={this.state.num}
          ref="header"
        />
        <button onClick={this.getChild}>父级主动获取子组件数据</button>
      </div>
    );
  }
  getMsg = () => {
    alert(`获取的state值:${this.state.style.color}`);
  };
  getMsg2() {
    alert(`获取的state值:${this.state.style.color}`);
  }
  getMsg3() {
    alert(`获取的state值:${this.state.style.color}`);
  }
  changedata = () => {
    //setState为异步方法,新版react赋值用法,`prevState为修改前的state`->this.state
    this.setState((prevState)=>{
      return {
        style: {
          color: "blue"
        }
      }
    });
  };
  changedata2 = str => {
    //改变state的方法
    this.setState({
      msg: str
    });
  };

  inputchange = event => {
    console.log(event.target.value);
    this.setState({
      inputval: event.target.value
    });
  };

  getInputval = () => {
    alert(this.state.inputval);
  };
  inputchange2 = () => {
    let val = this.refs.aaa.value;
    console.log(val);
    this.setState({
      inputval2: val
    });
  };
  getInputval2 = () => {
    alert(this.state.inputval2);
  };
  getkeyword = e => {
    console.log(e.keyCode);
  };
  getkeydown = e => {
    if (e.keyCode === 13) {
      alert(e.target.value);
    }
  };
  changeBind = e => {
    this.setState({
      bindval: e.target.value
    });
  };
  run = () => {
    alert("我是父组件传递给子组件的方法");
  };
  sendChildData(d) {
    alert(d);
  }
  //主动获取子组件数据
  getChild = () => {
    console.log(this.refs.header);
    alert(this.refs.header.state.userinfo);
  };
}

export default Home;
