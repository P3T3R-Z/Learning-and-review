
//redux核心api
/*
createStore   创建store
store.dispatch   派发action, action传递给store
store.getState  获取store的数据
store.subscribe  订阅store的改变

applyMiddleware redux使用中间件
 */
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

//redux调试工具配置(非入侵式)
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;


//添加redux-thunk中间件
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);


//创建store
let store = createStore(reducer, enhancer);



//开发环境配置

// let store =
//   process.env.NODE_ENV === "production"
//     ? createStore(reducer, applyMiddleware(thunk))
//     : //redux调试插件
//     window.__REDUX_DEVTOOLS_EXTENSION__
//     ? createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__())
//     : createStore(reducer, applyMiddleware(thunk));

export { store };

