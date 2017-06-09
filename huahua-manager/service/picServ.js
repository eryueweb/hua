'use strict';
let $picSqlOperate = require('../data/pic/picSqlOperate');
let $util = require('../common/util');
let log4js = require('log4js');
let logger = log4js.getLogger('picServ');

let picServ = function(){
	this.getPicList = function(type,id){
		return new Promise(function(resolve,reject){
			$picSqlOperate.getPicList(type,id).then((data)=>{
				let _data = data;
				_data.forEach(function(val,i){
					val.collectConvertDate = $util.timeConvert(new Date(val.collectDate));
				});
				resolve(_data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.delPic = function(type,id){
		return new Promise(function(resolve,reject){
			$picSqlOperate.delPic(type,id).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.addPic = function(type,req){
		return new Promise(function(resolve,reject){
			$picSqlOperate.addPic(type,req).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.editPic = function(type,id,req){
		return new Promise(function(resolve,reject){
			$picSqlOperate.editPic(type,id,req).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	}
};
module.exports = new picServ();
