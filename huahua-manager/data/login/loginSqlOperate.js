'use strict';
let $pool = require('../pool');
let	$loginSql = require('./loginSqlMap.js');
let log4js = require('log4js');
let logger = log4js.getLogger('loginSqlOperate');

let loginSqlOperate = function(){
	this.getUser=(userName,password)=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error('getConnection:'+err);
				connection.query($loginSql.getUser(userName,password),(err,result)=>{
					if(err) logger.error('query:'+err);

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
	}
};
module.exports = new loginSqlOperate();


