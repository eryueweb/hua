'use strict';
let $pool = require('../pool');
let	$blogSql = require('./blogSqlMap');
let log4js = require('log4js');
let logger = log4js.getLogger('blogSqlOperate');
let blogSqlOperate = function(){
	this.getBlog = (category,page,pageSize)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error('getBlog:'+err);
				connection.query($blogSql.getBlog(category,page,pageSize),(err,result)=>{
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
	this.getAllBlog = ()=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error('getAllBlog:'+err);
				connection.query($blogSql.getAllBlog(),(err,result)=>{
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
	this.getBlogDetail = (id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection(function(err,connection){
				if(err) logger.error(err);
				connection.query($blogSql.getBlogDetail(id),(err,result)=>{
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
	}
};
module.exports = new blogSqlOperate();