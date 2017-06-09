'use strict';
let $pool = require('../pool');
let	$bannerSql = require('./bannerSqlMap');
let log4js = require('log4js');
let logger = log4js.getLogger('bannerSqlOperate');

let bannerSqlOperate = function(){
	this.getBannerPic=()=>{
		return new Promise(function(resolve,reject){
			$pool.getConnection((err,connection)=>{
				if(err) logger.error(err);
				connection.query($bannerSql.getBannerPic(),(err,result)=>{
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
	}
};

/*if there is a large amount of data*/

// .on('error',(err)=>{
// 					logger.error(err)
// 				})
// 				.on('fields',(fields)=>{
// 					logger.info('fields'+fields)
// 				})
// 				.on('result',(row)=>{
// 					logger.info('row'+row);
// 					connection.pause();
// 					processRow(row,()=>{
// 						connection.resume()
// 					})
// 				})
// 				.on('end',(result)=>{
// 					logger.info(result);
// 					resolve(result)
// 				}

module.exports = new bannerSqlOperate();