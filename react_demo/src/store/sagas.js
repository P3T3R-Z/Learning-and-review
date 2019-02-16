//redux-saga可以捕捉store派发到reducer的action
import axios from "axios";
import { takeEvery, put} from "redux-saga/effects";
import {init_todolist_saga} from "./actionType";
import {getinitlist} from "./actionCreator"

function* getInitdata() {
    //generator函数中不需要使用promise函数
    try{
        var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
        const res = yield axios.get(api);
        const action = getinitlist(res.data.result);
        yield put(action) //store再次派发给reducer
    }catch(e){
        console.log('网络请求失败')
    }
    
}

//es6 generator函数
function* mysaga(){
    //捕捉init_todolist_saga类型, 执行getInitdata方法
    yield takeEvery(init_todolist_saga, getInitdata)
}

export default mysaga