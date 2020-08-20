var UserModel=require('./model/user.js');
// UserModel.find({},function(err, doc){
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(doc)
// })


//多个模型引用操作不需要考虑数据连接性能问题, mongoose底层已经优化

// var user = new UserModel({
//     name: "  我是你爸爸",
//       age: "12",

//       sn: '123456',
//       redirect: "www.baidu.com"
// });

// user.save()


//静态方法第调用
UserModel.findBySn('123456', function(err, docs){
    if(err){
        console.log(err)
        return 
    }
    console.log('success', docs)
})



//实例方法调用
// user.print()
