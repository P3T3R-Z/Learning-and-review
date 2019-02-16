import {input_value_change, add_todo_item, item_delete, init_todolist} from "./actionType"

const defaultState = {
  inputValue: "1",
  list: [],
};
//state 存储的数据
//action 数据操作
/*
reducer必须是纯函数, 
固定的输入必须有固定输出,
函数中不能有ajax请求, 定时器,日期相关操作,if操作,
可以接受state,但绝对不能修改state
*/
export default (state = defaultState, action) => {
  //console.log(state, action);
  //input输入事件
  if(action.type === input_value_change){
      //对state深拷贝
      const newState = JSON.parse(JSON.stringify(state));
      newState.inputValue = action.value;
      return newState; //返回给store
  }
  //添加事件
  if(action.type === add_todo_item){
      const newState = JSON.parse(JSON.stringify(state));
      newState.list.push(newState.inputValue); //添加按钮将当前input数据push到数组
      newState.inputValue = '';
      return newState; //返回给store
  }
  //删除item
  if(action.type === item_delete){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState
  }
  //初始todolist数据
  if(action.type === init_todolist) {
    
    const newState = JSON.parse(JSON.stringify(state));
    action.data.forEach((item) => {
      newState.list.push(item.title)
    });
    
    return newState
  }

  return state;  //store数据返回给react组件
};
