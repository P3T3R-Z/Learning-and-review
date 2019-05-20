## ejs末班引擎的使用
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