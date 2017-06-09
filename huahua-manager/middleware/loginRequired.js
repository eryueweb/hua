'use strict';
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const log4js = require('log4js');
const logger = log4js.getLogger('loginRequired');
const common = require('../bin/common');
module.exports = function(req,res,next){
	let cookies = new Cookies(req,res);
	let loginToken = cookies.get('token');
	if(loginToken){
		next()
	}else{
		let jump = common.getHost()+'/';
		return res.render('jump',{jump:jump})
	}
	res.status(401).end();
}