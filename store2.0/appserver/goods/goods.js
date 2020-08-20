var express = require ('express')
var router = express.Router();
var DB = require('../DB')
var ObjectId = require('mongodb').ObjectID //获取mongodb系统id 对象

var bodyParser = require('body-parser'); 
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

var multiparty = require('multiparty');  /*获取form表单的数据,用于接收图片数据*/
/* multiparty用法
 1.var form = new multiparty.Form();
 2.form.uploadDir='upload'   上传图片保存的地址
 3.form.parse(req, function(err, fields, files) {
      fields --->获取表单的数据
      files --->图片上传成功返回的信息
 4.html form标签添加 enctype="multipart/form-data" 或js Formdata上传
 });*/

//列表页渲染
router.get('/goodslist', function(req, res){
	DB.find('store', {}, function(data){
		//console.log(data)
		res.render("goodslist",{goods:data})
	})
})

//删除接口
router.get('/delete', function(req, res){
	let getdata = req.query;

	if(JSON.stringify(getdata) == "{}" ){
		res.json({msg:'缺少参数'})
		return
	}
	//获取mongodb系统id
	DB.delete('store', {'_id':new ObjectId(getdata.id)}, function(data){
		res.json(data)
	})
})

//插入页渲染
router.get('/insert', function(req, res){
	res.render('insertpage')
})

//插入接口
router.post('/addgoods', function(req, res){
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

//渲染修改页面
router.get('/update', function(req, res){
	var updquery = req.query
	if(JSON.stringify(updquery) == "{}"){
		return res.send('<script>alert("缺少参数");history.go(-1)</script>')
		
	} else{
		DB.find('store',{'_id':new ObjectId(updquery._id)},function(data){
			console.log(data[0])
			res.render('updatepage',data[0])
		})
	}
	
})

//更新接口
router.post('/updategoods', function(req, res){
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
module.exports = router