var Koa = require('koa');
var Router = require('koa-router')


var app = new Koa();
var router = new Router()


//路由匹配顺序,类似洋葱剖面,以下顺序为 1-2-对应路由-4-5

//应用级中间件
//2个参数表示匹配某个路由
//1个表示匹配所有路由
app.use(async (ctx, next) => {
    console.log(1, '路由中间件')
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
        ctx.body = '首页'    //返回数据  相当于：原生的res.writeHead()  res.end
    })
    .get('/news', async ctx => {
        ctx.body = '新闻页面'
    })
    .get('/other', async ctx => {           //get传值
        ctx.body = ctx.request  //详情
        // 1. 从ctx中读取
        console.log(ctx.query) //对象

        //2. 返回字符串
        console.log(ctx.querystring);
    })
    .get('/detail/:aid', async ctx => {       //动态路由
        console.log(ctx.params);
        ctx.body = `动态路由值:${JSON.stringify(ctx.params)}`
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