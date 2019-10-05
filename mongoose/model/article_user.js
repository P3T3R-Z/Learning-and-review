var mongoose = require("./db.js");

var ArticleUserSchema =mongoose.Schema({
  username:{
    type:String,
    unique:true
  },
  password:String,
  nama:String,
  age: Number,
  sex:String,
  tel:Number,
  status:{
    type: Number,
    default:1
  }
});

module.exports = mongoose.model("Articleuser", ArticleUserSchema, 'articleuser');
