import React, { Component, Fragment } from "react";
import { Input, Button, List } from "antd";
import { store } from "../store";
import rdpng from "../assets/images/redux.png";
class Rd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState(); // 获取redux的数据
    store.subscribe(this.handleStoreChange); //订阅store数据改变,执行handleStoreChange
  }

  render() {
    return (
      <Fragment>
        <p>redux操作步骤</p>
        <img src={rdpng} alt="" style={{ display: "block" }} />
        <Input
          placeholder="todolist"
          style={{ width: "60%" }}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={this.handleBtnclick}
        >
          添加
        </Button>
        <List
          style={{ marginTop: "10px", width: "60%" }}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  shape="circle"
                  icon="delete"
                  onClick={this.itemDelete.bind(this, index)}
                  size={"small"}
                />
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
  handleBtnclick = () => {
    const action = {
      type: "add_todo_item"
    };
    store.dispatch(action);
  };
  handleInputChange = e => {
    //redux store数据处理
    const action = {
      type: "input_value_change",
      value: e.target.value
    };
    store.dispatch(action);
  };
  itemDelete = index => {
    const action = {
      type: "item_delete",
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
