import React, { Component, Fragment } from "react";
import { store } from "../store";
import axios from "axios";
import ReduxpageUi from "./reduxpage_ui";
import {
  getinitdata,
  inputchange,
  addtodolist,
  deletelist
} from "../store/actionCreator";

class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取redux的数据
    this.source = axios.CancelToken.source() //用于取消请求凭证
    store.subscribe(this.handleStoreChange); //订阅store数据改变,执行handleStoreChange
  }

  render() {
    return (
      <Fragment>
        
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
    //方法2.使用redux-thunk中间件, 将异步获取数据函数放入actionCreator中 ,使得store可以接受函数
    const action = getinitdata(this.source.token);
    store.dispatch(action)
  }
  componentWillUnmount(){
    this.source.cancel('redux-thunk组件卸载,阻止请求')
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
