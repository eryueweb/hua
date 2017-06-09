let express = require('express');
let router = express.Router();
let log4js = require('log4js');
let logger = log4js.getLogger('interface');

let $userSqlOperate = require('../data/user/userSqlOperate');
/*service*/
let $bannerServ = require('../service/bannerServ');
let $picServ = require('../service/picServ');
let $blogServ = require('../service/blogServ');
/* GET users listing. */
router.get('/add', function(req, res, next) {
	$userSqlOperate.add(req,res,next)
});
router.get('/delete', function(req, res, next) {
	$userSqlOperate.delete(req,res,next)
});
router.get('/update', function(req, res, next) {
	$userSqlOperate.update(req,res,next)
});
router.get('/search', function(req, res, next) {
	$userSqlOperate.search(req,res,next)
});

/*banner*/
router.get('/banner',function(req,res,next){
	$bannerServ.getBannerPic().then((data)=>{
		logger.info(data);
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
/*pic*/
router.get('/pic/getPic/:type/:page/:pageSize',function(req,res,next){
	let type = req.params.type;
	let page = req.params.page;
	let pageSize = req.params.pageSize;
	$picServ.getPic(type,page,pageSize).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.get('/pic/getAllPic/:type',function(req,res,next){
	let type = req.params.type;
	$picServ.getAllPic(type).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.get('/pic/getPicView/:type/:id',function(req,res,next){
	let type = req.params.type;
	let id = req.params.id;
	$picServ.getPicView(type,id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.get('/pic/toHeart/:type/:id',function(req,res,next){
	let type = req.params.type;
	let id = req.params.id;
	$picServ.toHeart(type,id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
/*blog*/
router.get('/blog/getBlog',function(req,res,next){
	let category = req.query.category,
		page = req.query.page,
		pageSize = req.query.pageSize;
	$blogServ.getBlog(category,page,pageSize).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.get('/blog/getAllBlog',function(req,res,next){
	$blogServ.getAllBlog().then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.get('/blog/detail/:id',function(req,res,next){
	let id = req.params.id;
	$blogServ.getBlogDetail(id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
module.exports = router;