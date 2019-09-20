//操作user的模型
var mongoose = require("./db.js");

//定义schema 数据表的映射  字段名称必须与数据库保持一致

var UserSchema = mongoose.Schema({
  name: String,
  age: String,
  status:{
      type: Number,
      default: 1
  }
});

var UserModel = mongoose.model('User', UserSchema, "user")
module.exports = UserModel