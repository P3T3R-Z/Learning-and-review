const express = require('express');
const app = new express();
const ejs = require('ejs');
const ObjectId = require('mongodb').ObjectID //获取mongodb系统id 对象

var bodyParser = require('body-parser'); /*获取post传值模块*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var multiparty = require('multiparty');  /*获取form表单的数据*/
/* multiparty用法
 1.var form = new multiparty.Form();
 2.form.uploadDir='upload'   上传图片保存的地址
 3.form.parse(req, function(err, fields, files) {
      fields --->获取表单的数据
      files --->图片上传成功返回的信息
  4.html form标签添加 enctype="multipart/form-data" 或js Formdata上传
 });*/
var md5 = require('md5');
var session = require("express-session");

var DB = require('./DB')



app.use(session({
	secret: 'this is string key',
	name:'session_id',
	resave: false,
	saveUninitialized: false,   
	cookie: {
		maxAge:1000*60*30 //session存在于服务端的时间
	},  
	rolling:true
}))

app.engine('html', ejs.__express)
app.set('view engine', 'html');
//托管多个静态路由
app.use('/public', express.static('static'))
app.use('/upload', express.static('upload'))

//应用级中间件
app.use(function(req, res, next){
	console.log(req.url)
	app.locals['navStatus'] = req.url
	if(req.url=='/login' || req.url=='/dologin'){
        
              next()
        
    } else {
    	if(req.session.userInfo && req.session.userInfo.username != "") {
    		app.locals['userInfo'] = req.session.userInfo       /*配置全局ejs变量*/
    		next()
    	} else {
    		res.redirect('/login')
    	}
    }
	
})

app.get('/login', function(req, res){
	res.render('login')
})

app.post('/dologin', function(req, res){
	var postdata = req.body;  //post传值
	//console.log(postdata)
	var md5password = md5(postdata.password)
	console.log(md5password)
	var username = postdata.username
	
	DB.find('users', { username: username, password: md5password }, function(data){
		if(data.length>0){
			console.log('登录成功')
			req.session.userInfo = data[0]  //设置session
			res.send('<script>alert("登录成功");location.href="/goodslist"</script>')
			//res.redirect('/goodslist')
		} else {
			return res.send('<script>alert("登录失败");location.href="/login"</script>')
		}
	})
	
})

app.get('/goodslist', function(req, res){

	DB.find('store', {}, function(data){
		//console.log(data)
		res.render("goodslist",{goods:data})
	})
})

app.get('/delete', function(req, res){
	let getdata = req.query;

	if(JSON.stringify(getdata) == "{}" ){
		res.json({msg:'缺少参数'})
	}
	//获取mongodb系统id
	DB.delete('store', {'_id':new ObjectId(getdata.id)}, function(data){
		res.json(data)
	})
})

app.get('/add', function(req, res){
	// DB.insert('store', {name:'橘子', price:'10元/g', num:'100kg'}, function(datas){
	// 	res.send('<script>alert("'+datas+'")</script>')
	// })
	DB.insert('store', [{name:'西瓜', price:'10元/g', num:'100kg',pic:""},{name:'桃子', price:'12元/g', num:'120kg',pic:""}], function(datas){
		res.send(datas)
	})
})

app.get('/insert', function(req, res){
	res.render('insertpage')
})

app.get('/update', function(req, res){
	var updquery = req.query
	if(JSON.stringify(updquery) == "{}"){
		res.send('<script>alert("缺少参数");history.go(-1)</script>')
		return
	}
	DB.find('store',{'_id':new ObjectId(updquery._id)},function(data){
		console.log(data[0])
		res.render('updatepage',data[0])
	})
	
})

app.post('/updategoods', function(req, res){
	var form = new multiparty.Form();
    form.uploadDir='upload' 
    form.parse(req, function(err, fields, files) {
        console.log(fields);                    /*获取表单的数据*/
        console.log(files);                     /*图片上传成功返回的信息*/
        let name =fields.name[0]
        let price =fields.price[0]
        let num =fields.num[0]
        let id = fields.id[0]
        let picchange = fields.picchange[0]
        let pic = Array.prototype.isPrototypeOf(files.pic)?files.pic[0].path:""
        if(picchange == 'true'){
        	var obj = {name, price, num, pic}
        } else {
        	var obj = {name, price, num}
        }
        
        DB.update('store',{'_id':new ObjectId(id)}, obj, function(data){
        	res.json(data)
        })

    })
})

app.post('/addgoods', function(req, res){
	var form = new multiparty.Form();
    form.uploadDir='upload' 
    form.parse(req, function(err, fields, files) {
        console.log(fields);                    /*获取表单的数据*/
        console.log(files);                     /*图片上传成功返回的信息*/
        let name =fields.name[0]
        let price =fields.price[0]
        let num =fields.num[0]
        let pic = Array.prototype.isPrototypeOf(files.pic)?files.pic[0].path:""
        DB.insert('store',{
        	name, price, num, pic
        }, function(data){
        	res.json(data)
        })

    })
})

app.get('/logout', function(req, res){
	req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
})

app.use(function(req, res){
	res.status(404).send('<h1><i>404</i></h1>')
})
app.listen(8081, '127.0.0.1', function(){
	console.log('listening at 8081')
})