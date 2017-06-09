'use strict';
let $blogSqlOperate = require('../data/blog/blogSqlOperate');
let $util = require('../common/util');
let log4js = require('log4js');
let logger = log4js.getLogger('blogServ');

let blogServ = function(){
	this.getBlogList = function(type,id){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.getBlogList(type,id).then((data)=>{
				let _data = data;
				_data.forEach(function(val,i){
					val.createConvertTime = $util.timeConvert(new Date(val.createTime));
				});
				resolve(_data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.delBlog = function(type,id){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.delBlog(type,id).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.addBlog = function(req){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.addBlog(req).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.updateBlog = function(req,id){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.updateBlog(req,id).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	}
};
module.exports = new blogServ();
