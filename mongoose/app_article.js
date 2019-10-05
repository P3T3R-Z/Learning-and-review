var Articlecatemodel= require('./model/article_cate');

var articlemodel=require('./model/article.js');

var articleUsermodel=require('./model/article_user.js');
//分类增加
// var cate=new Articlecatemodel({
//     title:'国内新闻',
//     descrition:'国内新闻'
// })
// cate.save()

//作者数据u增加

// var user=new articleUsermodel({
//     username:'lisi',
//     password:'123123asda1',
//     name:'李四',
//     age: 22,
//     sex:'男',
//     tel:18232388888
// });

// user.save()


//文章增加
// var article=new articlemodel();
// article.title='福建台风登陆';
// article.description='福建台风登陆,此处省略300字';
// article.content='福建台风登陆,此处省略300字';
// article.author_id='5d989dc844802139fc9a4e64';
// article.cid="5d989cbd67c6ca34c4d43a91";
// article.author_name='张三';

// article.save()


//文章查询

// articlemodel.find({}, (err,docs)=>{
//     console.log(docs)
// })



//查询文章信息, 并显示分类个文章作者信息    多个表关联查询
articlemodel.aggregate([
    {
        $lookup:{
            from:'articlecate',
            localField:'cid',   //article 表的 cid
            foreignField:'_id',   //articlecate 表的_id   
            as:'cate'
        }
    },
    {
        $lookup:{
            from:'articleuser',
            localField:'author_id',   //article 表的 author_id
            foreignField:'_id',   //articleuser 表的_id   
            as:'user'
        }
    }
], function(err, docs){
    console.log(JSON.stringify(docs))
})