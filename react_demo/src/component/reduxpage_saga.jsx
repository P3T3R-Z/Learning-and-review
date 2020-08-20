
import React, { Component, Fragment } from "react";
import { store } from "../store";


import ReduxpageUi from "./reduxpage_ui";
import {
  get_init_list_saga,
  inputchange,
  addtodolist,
  deletelist
} from "../store/actionCreator";
class RdS extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取redux的数据
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
    //get_init_list_saga生成action, type为init_todolist
    const action = get_init_list_saga();
    //派发action到reducer, saga捕捉到此action对象,随后触发
    store.dispatch(action)
  }
  componentWillUnmount(){
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

export default RdS;
