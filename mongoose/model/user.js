//操作user的模型
var mongoose = require("./db.js");

//定义schema 数据表的映射  字段名称必须与数据库保持一致

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true   //预定义修饰符  去掉修饰符
  },
  age: String,
  status:{
      type: Number,
      default: 1  //默认
  },
  redirect:{
    type: String,
    set(params){ //自定义修饰符
      if(!params){
        return ''
      } else {
        if(params.indexof("http://")!=0 && params.indexof("https://")!=0){
          return "http://"+parmas
        }
        return params
      }
      
    }
  }
});

var UserModel = mongoose.model('User', UserSchema, "user")
module.exports = UserModel