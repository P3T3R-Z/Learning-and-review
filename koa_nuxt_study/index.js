const koa=require('koa');
var bodyParser = require('koa-bodyparser')
var static = require('koa-static')
var path=require('path')
var Router=require("koa-router")


const app=new koa()
var router = new Router()

app.use(router.routes())
app.use(bodyParser())

app.use(static(path.resolve(__dirname, './static')))

router.get('/', async ctx=>{
    ctx.body = "123"
})


app.listen(3000, ctx => {
    console.log(3000)
});