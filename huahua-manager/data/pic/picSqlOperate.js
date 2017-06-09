'use strict';
let $pool = require('../pool');
let	$picSql = require('./picSqlMap.js');
let log4js = require('log4js');
let logger = log4js.getLogger('picSqlOperate');

let picSqlOperate = function(){
	this.getPicList=(type,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($picSql.getPicList(type,id),(err,result)=>{
					logger.info(type);
					if(err) logger.error('getPicList:'+err);

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
	this.delPic=(type,id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error('delPic:'+err);
				connection.query($picSql.delPic(type,id),(err,result)=>{
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
	this.addPic=(type,req)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($picSql.addPic(type),req,(err,result)=>{
					if(err) logger.error('addPic:'+err);

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
	this.editPic=(type,id,req)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($picSql.editPic(type,id),req,(err,result)=>{
					if(err) logger.error('editPic:'+err);

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
module.exports = new picSqlOperate();


