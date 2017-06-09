'use strict';
let $pool = require('../pool');
let	$picSql = require('./picSqlMap');
let log4js = require('log4js');
let logger = log4js.getLogger('picSqlOperate');
let picSqlOperate = function(){
	this.getPic = (type,page,pageSize)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error(err);
				connection.query($picSql.getPic(type,page,pageSize),(err,result)=>{
					if(err) logger.error(err);

					if(result){
						resolve(result)
					}else{
						reject({
							code: 500,
							msg: '操作失败'
						})
					}
					connection.release();
				})
			})
		})
	},
	this.getAllPic = (type)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error(err);
				connection.query($picSql.getAllPic(type),(err,result)=>{
					if(err) logger.error(err);

					if(result){
						resolve(result)
					}else{
						reject({
							code: 500,
							msg: '操作失败'
						})
					}
					connection.release();
				})
			})
		})
	},
	this.getPicView = (type,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error(err);
				connection.query($picSql.getPicView(type,id),(err,result)=>{
					if(err) logger.error(err);

					if(result){
						resolve(result)
					}else{
						reject({
							code: 500,
							msg: '操作失败'
						})
					}
					connection.release();
				})
			})
		})
	},
	this.toHeart = (type,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error(err);
				connection.query($picSql.toHeart(type,id),(err,result)=>{
					if(err) logger.error(err);

					if(result){
						resolve({code: 200,msg: '已喜欢'});
					}else{
						reject({
							code: 500,
							msg: '操作失败'
						})
					}
					connection.release();
				})
			})
		})
	}
};
module.exports = new picSqlOperate();