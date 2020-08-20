## ejs模板引擎的使用
1. npm i koa-views --save
2. npm i ejs --save
3. var views = require('koa-views')
4.  应用ejs模板引擎
    app.use(views(__dirname, {
        extension: 'ejs'
    }))
    app.use(views(__dirname, { map: { html: 'ejs' } }))

## koa-bodyparse使用
1. npm i -S koa-bodyparse
2. require
3. app.use(bodyparse())
4. ctx.request.body


## 静态资源托管
1. cnpm i -S koa-static
2. require
3. app.use(static('./static'))  可配置多个

## art-template模板引擎
1. cnpm i -S koa-art-template art-template
2. render=require('koa-art-template')
3. render(app, {
        root: path.join(__dirname, 'view'),  //视图位置
        extname: '.art',   //后缀名
        debug: process.env.NODE_ENV !== 'production'  //调试
   })


## cookie使用
ctx.cookie.set(key, value, {
    maxAge: 60*1000*60,    //表示从Date.now()得到的毫秒数
    expires: ,//过期的Date
    path: ,//cookie路径,默认/
    domain:,//域名
    secure:, //默人false,true表示只有https访问
    httpOnly:,//是否是服务器可访问的cookie, 默认true
})