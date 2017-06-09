let $bannerSqlOperate = require('../data/bannerData/bannerSqlOperate');
let log4js = require('log4js');
let logger = log4js.getLogger('bannerServ');

let bannerServ = function(){
	this.getBannerPic = function(){
		return new Promise(function(resolve,reject){
			$bannerSqlOperate.getBannerPic().then((data)=>{
				logger.info(data);
				resolve(data);
			}).catch(function(msg){
				logger.error(msg)
			});
		})
	}
};
module.exports = new bannerServ();
