
const DBurl = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const dbName = "store";

function _connectDB(connectCallback) {
	MongoClient.connect(DBurl, { useNewUrlParser: true }, function(error,client){
		if(error) {
			console.log('连接mongodb失败')
			return;
		}
		console.log('连接mongodb成功')
		 

		connectCallback(client)  //连接后的回调

		
	})
}


exports.find = function(collectionsName, json, callback) {
	_connectDB( function(client) {

		let db = client.db(dbName)
		db.collection(collectionsName).find(json).toArray(function(erroror, data) {
				if(erroror){
					console.log("查询失败:",error)
					return
				}
				client.close() 
				callback(data)
		})
	})
}

exports.insert = function(collectionsName, jsonOrArray, callback){
	_connectDB( function(client) {

		let db = client.db(dbName)
		//插入单条
		if( !Array.prototype.isPrototypeOf(jsonOrArray) ){
			db.collection(collectionsName).insertOne(jsonOrArray, function(erroror, data) {
					if(erroror){
						console.log("插入失败:",error)
						return
					}
					client.close() 
					callback(data)
			})
		} 
		//插入多条
		if( Array.prototype.isPrototypeOf(jsonOrArray) ){
			db.collection(collectionsName).insert(jsonOrArray, function(erroror, data) {
					if(erroror){
						console.log("插入失败:",error)
						return
					}
					client.close() 

					callback(data)
			})
		}
		
	})
}

exports.update= function(collectionsName, json1, json2, callback){
	_connectDB(function(client){
		let db = client.db(collectionsName)
		db.collection(collectionsName).updateOne(json1,{$set:json2},function(erroror, updated) {
			if(erroror){
				console.log("更新失败:",error)
				return
			}
			client.close() 
			callback(updated)
		})
	})
}

exports.delete= function(collectionsName, jsonOrArray, callback){
	_connectDB(function(client){
		let db = client.db(collectionsName)
		//删除单条
		if( !Array.prototype.isPrototypeOf(jsonOrArray) ){
			db.collection(collectionsName).deleteOne(jsonOrArray, function(erroror, data){
				if(erroror){
					console.log("删除单个失败:",erroror)
					return
				}
				client.close() 
				callback(data)
			})
		} else {
			//删除多条
			db.collection(collectionsName).deleteMany({$or: jsonOrArray}, function(erroror, data){
				if(erroror){
					console.log("删除多个失败:",erroror)
					return
				}
				client.close() 
				callback(data)
			})
		}
	})
}