var UserModel=require('./model/user.js');
UserModel.find({},function(err, doc){
    if(err){
        console.log(err)
        return
    }
    console.log(doc)
})


//多个模型引用操作不需要考虑数据连接性能问题, mongoose底层已经优化