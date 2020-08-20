var express = require ('express')
var router = express.Router();
var DB = require('../DB')

var bodyParser = require('body-parser'); 
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

var md5 = require('md5');


router.get('/login', function(req,res){
    res.render('login')
})

router.post('/dologin', function(req, res){
	var postdata = req.body; 
	var md5password = md5(postdata.password)
	var username = postdata.username
	
	DB.find('users', { username: username, password: md5password }, function(data){
		if(data.length>0){
			console.log('登录成功')

			req.session.userInfo = data[0]  //设置session
			res.send('<script>alert("登录成功");location.href="/goods/goodslist"</script>')
		} else {
			return res.send('<script>alert("登录失败");location.href="/login"</script>')
		}
	})
})

router.get('/logout', function(req, res){
	req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
})

module.exports = router