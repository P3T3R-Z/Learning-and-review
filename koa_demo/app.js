var Koa = require('koa');
var path = require('path');
var Router = require('koa-router')
var views = require('koa-views');
var postModule = require('./post_module')//原生node获取post表单数据
var bodyParser = require('koa-bodyparser')
var static = require('koa-static')
var render = require('koa-art-template')

var app = new Koa();
var router = new Router()

//以ejs后缀文件来渲染
// app.use(views(__dirname, {
//     extension: 'ejs'
// }))
//以html文件渲染
//app.use(views(__dirname + '/views', { map: { html: 'ejs' } }))

//配置koa-bodyparser中间件
app.use(bodyParser())

//配置koa-static托管
app.use(static(path.resolve(__dirname, './static')))

//kao-art-template配置
render(app, {
    root: path.join(__dirname, 'views'),  //视图位置
    extname: '.html',   //后缀名
    debug: process.env.NODE_ENV !== 'production'  //调试
})




//路由匹配顺序,类似洋葱剖面,以下顺序为 1-2-对应路由-4-5

//应用级中间件
//2个参数表示匹配某个路由
//1个表示匹配所有路由
app.use(async (ctx, next) => {
    console.log(1, '应用级中间件')


    //ejs全局变量
    ctx.state = {
        username: '张三'
    }


    await next()  /*当前路由匹配完成以后继续向下匹配 */

    console.log(5)
})

//错误处理中间件
app.use(async (ctx, next) => {
    console.log(2, '错误处理中间件')
    await next()

    console.log(4)
    if (ctx.status == 404) {
        ctx.body = '<h1>404</h1>'
    }
})




//路由中间件

//配置路由
//ctx 上下文 包含了request和response
router
    .get('/', async (ctx) => {

        //ejs局部变量
        // let arr = [1, 2, 3, 4];
        // let content = '<h2>带html标签文本</h2>'
        // await ctx.render('index', {
        //     list: arr,
        //     content
        // })

        //art-template
        let arr = [1, 2, 3, 4];
        let content = '<h2>带html标签文本</h2>'
        await ctx.render('index2', {
            list: arr,
            content
        })
    })
    .get('/news', async ctx => {
        ctx.body = '新闻页面'    //返回数据  相当于：原生的res.writeHead()  res.end
        await ctx.render('news')
    })
    .get('/other', async ctx => {           //get传值
        ctx.body = ctx.request  //详情
        // 1. 从ctx中读取
        console.log(ctx.query) //对象

        //2. 返回字符串
        console.log(ctx.querystring);
    })
    .get('/login', async ctx => {           //get传值
        await ctx.render('login')
    })
    .get('/detail/:aid', async ctx => {       //动态路由
        console.log(ctx.params);
        ctx.body = `动态路由值:${JSON.stringify(ctx.params)}`
    })
    .post('/api', async ctx => {   //post请求获取

        //原生node获取post
        //var data=await postModule(ctx)

        //koa-bodyparser获取post参数对象
        var data = ctx.request.body
        ctx.body = data
    })







//路由使用
app
    .use(router.routes())       //启动路由
    .use(router.allowedMethods());  //建议配置
/*
router.allowedMethods()作用: 在router.routes之后,当所有路由中间件最后调用,
此时根据ctx.status 设置response响应头
*/



app.listen(3000, ctx => {
    console.log(3000)
});