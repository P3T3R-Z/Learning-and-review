const express = require('express');
const app = express();  //创建express程序
const server = require('http').Server(app);
//const fs = require('fs')  //node文件模块
const path = require('path');
const sockectServer = require('socket.io')(server);     //将socket的监听加到app设置的模块里。

const users = [];                    //用来保存所有的用户信息
let usersNum = 0;

server.listen(3001, ()=>{
	console.log('server running at 127.0.0.1:3001')
})

app.get('/', (req,res)=>{
	res.redirect('/chat.html')  //express重定向
})

//解析chat.html
/*方法一*/
// app.get('/chat.html', function(req, res){
// 	fs.readFile(path.join(__dirname, './public/chat.html'), function(err, data){
// 		if(err){
// 			console.error('读取失败', err)
// 			res.send('404')
// 		} else {
// 			res.end(data)
// 		}
// 	})
// })

/*方法二*/
 // express.static托管了public文件夹中的静态资源。

app.use('/',express.static(path.join(__dirname,'./public'))); 


/*socket*/

//监听客户端链接事件
//在websocket 服务器对象中有一个connection事件，这个事件在有客户端连接到socket服务器时被触发
sockectServer.on('connection', socket=>{

	/*socket为连接到客户端的一个socket端口对象，这个对象有一个message 事件，
	当客户端有消息推送到服务器时，事件循环会取出这个事件与之对应的回调函数并执行*/
	/*socket.on("message",msg => {
	    console.log(msg);
	});*/
	//使用socket对象的send方法就能使消息在服务器与客户端进行消息传递
	/*socket.send('来自服务端')*/
	//socket.send('来自node服务端的问候')
	
	

	
	//登录成功后执行
	socket.on('login', (data)=>{
		
		new Promise((resolve,reject)=>{
			
			
			
			if(users.length>0){
				users.forEach(i=>{
					
					if(i.username == data.username) {
						console.log('名字重复，请重新取名')
						socket.send('名字重复，请重新取名！')
						
						resolve(data)
						return false
					}else{
						
						console.log(`开始登陆`)
						reject(data)
					}
				})
			}else{
				console.log(`开始登陆`)
				reject(data)
			}
		})
		.then(data=>{
			console.log('名字重复,登陆失败')
			return false
		})
		.catch(data=>{
			
			users.push({
				username: data.username,
				message: [],
				selfSocket: socket
			});
			console.log('登陆success')
			console.log(socket.id+'链接了socket服务器')
			usersNum++

			console.log(`当前有${usersNum}个用户连接上了服务器`);
			
			socket.emit('loginSuccess', data); 
		})
		
		
		
	});

	//断开连接后触发,注意，该事件不需要自定义触发器，系统会自动调用
	socket.on('disconnect', ()=>{
		
		
		users.forEach((i,index)=>{
			if(i.selfSocket.id == socket.id) {
				console.log(socket.id+'断开了链接')
				usersNum=usersNum-1 //<0?0:usersNum-1
				users.splice(index,1)
				console.log(`当前有${usersNum}个用户连接上服务器`)
			}
			console.log(i.username)
		})
		
		
	})



	//群聊
	//接收客户端发送的消息
	socket.on('sendMessage', data => {
	    users.forEach((i,index)=>{

	    	//if(data.sendtoUsername == i.username){
	    	//	console.log(`${data.username}发送给->`,data.sendtoUsername)
	    		i.selfSocket.emit('receiveMessage', data)
	    	//}
	    })
	})

	

})