'use strict';
let $loginSqlOperate = require('../data/login/loginSqlOperate');
let log4js = require('log4js');
let logger = log4js.getLogger('loginServ');

let loginServ = function(){
	this.getUser = function(userName,password){
		return new Promise(function(resolve,reject){
			$loginSqlOperate.getUser(userName,password).then((data)=>{
				resolve(data);
		}).catch(function(msg){
				logger.error(msg)
			});
		})
	}
};
module.exports = new loginServ();
