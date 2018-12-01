const express = require('express');
const app = new express();

const ejs = require('ejs');
app.engine('html', ejs.__express)
app.set('view engine', 'html');
app.set('views', __dirname+'/view')

var session = require("express-session");
app.use(session({
	secret: 'this is string key',
	name:'session_id',
	resave: false,
	saveUninitialized: false,   
	cookie: {
		maxAge:1000*60*30
	},  
	rolling:true
}))

//静态托管
app.use('/public', express.static('static'))
app.use('/upload', express.static('upload'))



//路由前应用级中间件
app.use(function(req, res, next){
	console.log(req.url)
	app.locals['navStatus'] = req.url  //全局ejs变量
	if(req.url=='/login/login' || req.url=='/login/dologin'){
        next();

    }else{
		if(req.session.userInfo && req.session.userInfo.username != "") {
			app.locals['userInfo'] = req.session.userInfo       /*全局ejs变量*/
			next()
		} else {
			res.redirect('/login/login')
		}
	}
})


const loginmodule = require('./appserver/login/login.js') //登录模块
const goodsmodule = require('./appserver/goods/goods.js') //商品模块

app.use('/login', loginmodule)
app.use('/goods', goodsmodule)


app.use(function(req, res){
	res.status(404).send('<h1><i>404</i></h1>')
})
app.listen(8081, function(){
	console.log('listening at 8081')
})