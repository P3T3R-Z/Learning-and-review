//这是父级容器组件
//容器组件与ui组件拆分
/*
  容器组件处理逻辑
  ui组件处理渲染
  容器组件作为ui组件的父组件, 传递对于所需的数据
*/
import React, { Component, Fragment } from "react";
import { store } from "../store";
import rdpng from "../assets/images/redux.png";
import axios from "axios";

import ReduxpageUi from "./reduxpage_ui";
import {
  getinitlist,
  inputchange,
  addtodolist,
  deletelist
} from "../store/actionCreator";
class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取redux的数据
    this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    store.subscribe(this.handleStoreChange); //订阅store数据改变,执行handleStoreChange
  }

  render() {
    return (
      <Fragment>
        <pre>
          redux核心api
          <br />
          createStore 创建store
          <br />
          store.dispatch 派发action, action传递给store
          <br />
          store.getState 获取store的数据
          <br />
          store.subscribe 订阅store的改变
          <br />
        </pre>
        <img src={rdpng} alt="" style={{ display: "block" }} />
        {/* 这是ui组件 */}
        <ReduxpageUi
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleBtnclick={this.handleBtnclick}
          list={this.state.list}
          itemDelete={this.itemDelete}
        />
      </Fragment>
    );
  }
  
  componentDidMount() {
    //生命周期中获取异步数据并生产action对象派发给store
    var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
    var _t = this
    axios
      .get(api, {
        cancelToken: _t.source.token
      })
      .then(res => {
        //初始化todolist的action
        const action = getinitlist(res.data.result);
        store.dispatch(action);
      })
      .catch(err => {
        //取消请求时触发
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          console.log(err)
        }
      });
  }
  componentWillUnmount(){
    this.source.cancel('组件卸载,取消请求');
    this.setState = (state, callback) => {
      return
    }
  }
  handleBtnclick = () => {
    //生成增加todolist的action
    const action = addtodolist();
    store.dispatch(action);
  };
  handleInputChange = e => {
    //生成inputchange的action
    const action = inputchange(e.target.value);
    //派发action
    store.dispatch(action);
  };
  itemDelete = index => {
    //生成todolist删除的action
    const action = deletelist(index);
    store.dispatch(action);
  };
  handleStoreChange = () => {
    //当前组件重新取一次store中的数据
    this.setState(store.getState());
  };
}

export default Rd;
