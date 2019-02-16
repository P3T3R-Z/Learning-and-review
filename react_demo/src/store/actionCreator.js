//统一管理生成action 用于派发给store
import {
  input_value_change,
  add_todo_item,
  item_delete,
  init_todolist,
  init_todolist_saga
} from "./actionType";
import axios from "axios";
//初始化todolist的action
export const getinitlist = value => ({
  type: init_todolist,
  data: value
});
//redux-thunk的action中获取tidolist数据
export const getinitdata = (token) => {
  return (dispatch) => {
    
    var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
    axios
      .get(api, {
        cancelToken: token
      })
      .then(res => {
        //获取请求数据, 创建action对象, 继续派发给store,
         const action = getinitlist(res.data.result);
         dispatch(action);
      })
      .catch(err => {
        //取消请求时触发
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          console.log(err)
        }
      });
  };
};

//input改变
export const inputchange = value => ({
  type: input_value_change,
  value
});
//添加todolist
export const addtodolist = () => ({
  type: add_todo_item
});
//删除todolist
export const deletelist = index => ({
  type: item_delete,
  index
});
//用于saga中间件的action
export const get_init_list_saga = ()=>({
  type: init_todolist_saga
})