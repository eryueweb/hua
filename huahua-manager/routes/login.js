const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const hash = crypto.createHash('md5');
const log4js = require('log4js');
const logger = log4js.getLogger('login');
const common = require('../bin/common');
const $loginServ = require('../service/loginServ');

router.get('/', function(req, res, next) {
  res.render('login.html');
});

router.post('/login',function(req,res,next){
	let userName = req.body.userName,
		password = hash.update(req.body.password).digest('hex');
	logger.info(userName);
	logger.info(password);
	$loginServ.getUser(userName,password).then((data)=>{
		logger.info(data);
		if(data.length > 0){
			let jwtinfo = data[0];
			let jwtKey = 'I am an user';
			let token = jwt.sign(jwtinfo,jwtKey,{
				expiresIn: 60*60*24
			});
			res.cookie('token',token);
			res.json({success: true})
		}else{
			res.json({success: false,msg: '用户名或密码错误！'})
		}
	}).catch((msg)=>{
		logger.error(msg);
		res.json({success: false,msg: msg});
	})
});
module.exports = router;
