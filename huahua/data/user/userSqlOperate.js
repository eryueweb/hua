var mysql = require('mysql');
var	$config = require('../mysqlConfig');
var	$userSql = require('./userSqlMap');
//创建连接池
var pool = mysql.createPool($config.db);

var userOperate = {
	add: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err) throw err;
			//var param = req.param;   //前台传过来的数据
			var newUser = {name: 'Kitty',sex: 'boy',age: 27,email: 'joe@jk.com'};
			connection.query($userSql.add,newUser,function(err,result){
				if(err) throw err;
				if(result){
					res.json({
						code: 200,
						msg: '添加成功'
					})
				}else{
					res.json({
						code: 500,
						msg: '操作失败'
					})
				}
			})
		})
	},
	delete: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err) throw err;
			
			connection.query($userSql.delete,function(err,result){
				if(err) throw err;
				if(result){
					res.json({
						code: 200,
						msg: '删除成功'
					})
				}else{
					res.json({
						code: 500,
						msg: '操作失败'
					})
				}
			})
		})
	},
	update: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err) throw err;
			
			connection.query($userSql.update,['David','boy','26','david@jk.com',7],function(err,result){
				if(err) throw err;
				if(result){
					res.json({
						code: 200,
						msg: '修改成功'
					})
				}else{
					res.json({
						code: 500,
						msg: '操作失败'
					})
				}
			})
		})
	},
	search: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err) throw err;
			
			connection.query($userSql.search,function(err,result){
				if(err) throw err;
				if(result){
					res.json(result)
				}else{
					res.json({
						code: 500,
						msg: '操作失败'
					})
				}
			})
		})
	}
};
module.exports = userOperate;