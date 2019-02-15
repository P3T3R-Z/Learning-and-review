//统一管理生成action 用于派发给store
import {
    input_value_change,
    add_todo_item,
    item_delete,
    init_todolist
  } from "./actionType";

  //初始化todolist的action
  export const getinitlist =(value)=> ({
    type: init_todolist,
    data: value
  });
//input改变
  export const inputchange =(value)=> ({
    type: input_value_change,
    value
  });
//添加todolist
  export const addtodolist =()=> ({
    type: add_todo_item,
  });
//删除todolist
  export const deletelist =(index)=> ({
    type: item_delete,
    index
  });
 