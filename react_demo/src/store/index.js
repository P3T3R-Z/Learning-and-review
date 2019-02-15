import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export {store}


//redux核心api
/*
createStore   创建store
store.dispatch   派发action, action传递给store
store.getState  获取store的数据
store.subscribe  订阅store的改变
 */