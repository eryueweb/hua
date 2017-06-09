let $picSqlOperate = require('../data/picData/picSqlOperate');
let log4js = require('log4js');
let logger = log4js.getLogger('picServ');
let util = require('../common/util.js');
let picServ = function(){
	this.getPic = function(type,page,pageSize){
		return new Promise(function(resolve,reject){
			$picSqlOperate.getPic(type,page,pageSize).then((data)=>{
				resolve(data)
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	},
	this.getAllPic = function(type){
		return new Promise(function(resolve,reject){
			$picSqlOperate.getAllPic(type).then((data)=>{
				resolve(data)
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	},
	this.getPicView = function(type,id){
		return new Promise(function(resolve,reject){
			$picSqlOperate.getPicView(type,id).then((data)=>{
				let _data = data;
				_data.forEach(function(val,i){
					val.collectConvertDate = util.periodConvert(new Date(val.collectDate));
				});
				resolve(_data)
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	},
	this.toHeart = function(type,id){
		return new Promise(function(resolve,reject){
			$picSqlOperate.toHeart(type,id).then((data)=>{
				resolve(data)
			}).catch(function(msg){
				logger.error(msg)
			})
		})
	}
};
module.exports = new picServ();