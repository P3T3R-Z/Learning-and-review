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
      default: 1 , //默认
      
  },
  sn:{
    type: String,
    index: true  //设置索引              //db.user.getIndexes() mongodb原生查看索引方法
  },
  redirect:{
    type: String,
    set(params){ //自定义修饰符

      
      if(!params){
        return ''
      } else {
        
        if(params.indexOf("http://")!=0 && params.indexOf("https://")!=0){
          return `http://${params}`
        }
        return params
      }
      
    }
  }
});



//静态方法
UserSchema.statics.findBySn=function(sn, cb){
  //通过 find方法获取 sn的数据
  this.find({"sn":sn}, (err, docs)=>{
    cb(err, docs)
  })
}

//实例方法(几乎用不到)
UserSchema.methods.print=function(){ 
  console.log('实例方法', this)
}

var UserModel = mongoose.model('User', UserSchema, "user")
module.exports = UserModel