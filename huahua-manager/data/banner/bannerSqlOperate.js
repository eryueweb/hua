'use strict';
let $pool = require('../pool');
let	$bannerSql = require('./bannerSqlMap.js');
let log4js = require('log4js');
let logger = log4js.getLogger('bannerSqlOperate');

let bannerSqlOperate = function(){
	this.getBannerList=(id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($bannerSql.getBannerList(id),(err,result)=>{
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
	this.delBannerPic=(id)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($bannerSql.delBannerPic(id),(err,result)=>{
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
	this.addBannerPic=(req)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($bannerSql.addBannerPic(),req,(err,result)=>{
					if(err) logger.error(err);

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
	}
};
module.exports = new bannerSqlOperate();


