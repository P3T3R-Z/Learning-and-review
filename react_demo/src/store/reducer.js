const defaultState = {
  inputValue: "redux store默认值",
  list: []
};
//state 存储的数据
//action 数据操作
//reducer限制:reducer可以接受state,但绝对不能修改state
export default (state = defaultState, action) => {
  console.log(state, action);
  //input输入事件
  if(action.type === "input_value_change"){
      //对state深拷贝
      const newState = JSON.parse(JSON.stringify(state));
      newState.inputValue = action.value;
      return newState; //返回给store
  }
  //添加事件
  if(action.type === 'add_todo_item'){
      const newState = JSON.parse(JSON.stringify(state));
      newState.list.push(newState.inputValue); //添加按钮将当前input数据push到数组
      newState.inputValue = '';
      return newState; //返回给store
  }
  //删除item
  if(action.type === 'item_delete'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState
  }
  return state;  //store数据返回给react组件
};
