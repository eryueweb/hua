'use strict';
let $pool = require('../pool');
let	$blogSql = require('./blogSqlMap.js');
let log4js = require('log4js');
let logger = log4js.getLogger('blogSqlOperate');

let blogSqlOperate = function(){
	this.getBlogList=(type,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($blogSql.getBlogList(type,id),(err,result)=>{
					if(err) logger.error('getBlogList:'+err);

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
	this.delBlog=(id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error('delBlog:'+err);
				connection.query($blogSql.delBlog(id),(err,result)=>{
					if(err) logger.error(err);

					if(result){
						resolve({code: 200,msg: '删除成功'})
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
	this.addBlog=(req)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($blogSql.addBlog(),req,(err,result)=>{
					if(err) logger.error('addBlog:'+err);

					if(result){
						resolve({code: 200,msg: '添加成功'})
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
	this.updateBlog=(req,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);

				connection.query($blogSql.updateBlog(id),req,(err,result)=>{
					if(err) logger.error('updateBlog:'+err);

					if(result){
						resolve({code: 200,msg: '更新成功'})
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


