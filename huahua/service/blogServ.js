let $blogSqlOperate = require('../data/blogData/blogSqlOperate');
let log4js = require('log4js');
let logger = log4js.getLogger('blogServ');
let util = require('../common/util.js');
let blogServ = function(){
	this.getBlog = function(category,page,pageSize){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.getBlog(category,page,pageSize).then((data)=>{
				let _data = data;
				_data.forEach(function(val,i){
					val.periodConvert = util.periodConvert(new Date(val.createTime));
				});
				resolve(_data);
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	},
	this.getAllBlog = function(){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.getAllBlog().then((data)=>{
				resolve(data);
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	},
	this.getBlogDetail = function(id){
		return new Promise(function(resolve,reject){
			$blogSqlOperate.getBlogDetail(id).then((data)=>{
				let _data = data;
				_data[0].periodConvert = util.periodConvert(new Date(_data[0].createTime));
				resolve(_data);
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	}
};
module.exports = new blogServ();