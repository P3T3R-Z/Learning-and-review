const mongoose = require("mongoose");

//useNewUrlParser属性会在url里识别验证用户所需的db
mongoose.connect("mongodb://127.0.0.1/eggcms", { useNewUrlParser: true,  useUnifiedTopology: true }, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('数据库连接成功')
});

//定义schema 数据表的映射  字段名称必须与数据库保持一致

var NewsSchema = mongoose.Schema({
  title: String,
  author: String,
  pic: String,
  content: String,
  status: Number
});

//定义操作数据库的model, 如下News模型 不传第三个参数默认为News复数的数据库表
var News = mongoose.model("News", NewsSchema, "news");

            //增加数据

            //实例化model 创建增加的数据
            // var news = new News({
            // title: "新闻标题",
            // author: "张三",
            // content: "新闻内容",
            // status: 1
            // });

            // news.save()




            //修改数据
            // News.updateOne({"_id":"5d84dada6f98533380a78d9c"}, {title:'我是更新的新闻标题'}, function(err, doc){
            //     if(err){
            //         return console.log(err)
            //     }
            //     console.log('success', doc)
            // })


            //删除数据
            News.deleteOne({"_id":"5d84dd66c79896376c10ba6f"}, (err,doc)=>{
                if(err){
                    return console.log(err)
                }
                console.log('success', doc)  
            })