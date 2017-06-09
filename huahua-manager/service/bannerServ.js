'use strict';
let $bannerSqlOperate = require('../data/banner/bannerSqlOperate');
let log4js = require('log4js');
let logger = log4js.getLogger('bannerServ');

let bannerServ = function(){
	this.getBannerList = function(id){
		return new Promise(function(resolve,reject){
			$bannerSqlOperate.getBannerList(id).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.delBannerPic = function(id){
		return new Promise(function(resolve,reject){
			$bannerSqlOperate.delBannerPic(id).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	},
	this.addBannerPic = function(req){
		return new Promise(function(resolve,reject){
			$bannerSqlOperate.addBannerPic(req).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	}
};
module.exports = new bannerServ();
