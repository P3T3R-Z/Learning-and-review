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
import {
  input_value_change,
  add_todo_item,
  item_delete,
  init_todolist
} from "../store/actionType";
import ReduxpageUi from "./reduxpage_ui";

class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取redux的数据
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
  //redux获取异步请求数据
  componentDidMount() {
    var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
    axios
      .get(api)
      .then(res => {
        const action = {
          type: init_todolist,
          data: res.data.result
        };
        store.dispatch(action);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleBtnclick = () => {
    const action = {
      type: add_todo_item
    };
    store.dispatch(action);
  };
  handleInputChange = e => {
    //redux store数据处理
    const action = {
      type: input_value_change,
      value: e.target.value
    };
    store.dispatch(action);
  };
  itemDelete = index => {
    const action = {
      type: item_delete,
      index: index
    };
    store.dispatch(action);
  };
  handleStoreChange = () => {
    //当前组件重新取一次store中的数据
    this.setState(store.getState());
  };
}

export default Rd;
