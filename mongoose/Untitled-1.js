const mongoose = require('mongoose')

//建立连接
mongoose.connect('mongodb://127.0.0.1:27017/eggcms', { useNewUrlParser: true,  useUnifiedTopology: true });  //账号密码链接方式 






//定义一个Schema Schema里面的对象和数据课表的字段需要一一对应

var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: Number
})


//定义数据可模型 操作数据库
//model 里面的第一个参数 要注意: 1 首字母大写 2 要和数据库表名称对应 

//var User = mongoose.model('User', UserSchema)  //默认会操作Users表 //这个模型会和模型名称相同的 `复数` 的数据库表建立连接
var User = mongoose.model('p', UserSchema, 'order');  //操作order表


            //查询
            // User.find({}, function(err, doc){
            //     if(err){
            //         return console.log(err);
            //     }
            //     console.log(doc)
            // })


//增加数据

//1.实例化 model 通过实例化User model 增加数据
//2.实例.save()

            // var u=new User({
            //     name:'李四',
            //     age: 20,
            //     status: 1
            // })
            // u.save(function(err, ctx){
            //     if(err) {
            //          console.log(err)
            //          return
            //     }
            //     console.log('success', ctx)
            // })

