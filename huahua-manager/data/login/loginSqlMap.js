'use strict';
let log4js = require('log4js');
let logger = log4js.getLogger('loginSqlMap');
let login = function(){
	this.getUser=(userName,password)=>{
		return 'select * from user_table where userName="'+userName+'" and password="'+password+'"'
	}	
};
module.exports = new login();