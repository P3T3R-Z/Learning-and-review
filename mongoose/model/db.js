//连接数据库


const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true) 
//useNewUrlParser属性会在url里识别验证用户所需的db
mongoose.connect("mongodb://127.0.0.1/eggcms", { useNewUrlParser: true,  useUnifiedTopology: true }, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('数据库连接成功')
});

module.exports=mongoose