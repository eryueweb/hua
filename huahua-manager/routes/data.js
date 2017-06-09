let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let log4js = require('log4js');
let logger = log4js.getLogger('interface');
let common = require('../bin/common');
let upload = require('../common/upload');
/*service start*/
let $bannerServ = require('../service/bannerServ');
let $picServ = require('../service/picServ');
let $blogServ = require('../service/blogServ');
/*service end*/

/*banner start*/
router.get('/banner/getBannerList',function(req,res,next){
	$bannerServ.getBannerList().then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/banner/delBannerPic',function(req,res,next){
	var id = req.body.id;
	var picUrl = req.body.picUrl;
	var picUrlArr = picUrl.split('/');
	var targetPath = 'public/images/banner/'+picUrlArr[(picUrlArr.length)-1];
	upload.imgDel(targetPath);
	$bannerServ.delBannerPic(id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/banner/addBannerPic',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/banner';
	form.parse(req,function(err,fields,files){
		var tmpPath = files.picUrl.path;
		var type = files.picUrl.type;
		var tmp_name = upload.imgUploadName(type);
		var targetPath = 'public/images/banner/' + tmp_name;
		upload.imgUpload(tmpPath,targetPath);
		$bannerServ.addBannerPic({'picUrl':common.getPicHost()+'/images/banner/'+tmp_name}).then((data)=>{
			res.json(data);
		}).catch((msg)=>{
			logger.error(msg)
		})
	})
});
/*banner end*/
/*pic start*/
router.get('/pic/getPicList',function(req,res,next){
	var type = req.query.type,
		id = req.query.id;
	$picServ.getPicList(type,id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/pic/delPic',function(req,res,next){
	var type = req.body.type;
	var id = req.body.id;
	var picUrl = req.body.picUrl;
	var picUrlArr = picUrl.split('/');
	var targetPath = 'public/images/pic/'+type+'/'+picUrlArr[(picUrlArr.length)-1];
	upload.imgDel(targetPath);
	$picServ.delPic(type,id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/pic/addPic',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/pic';
	form.parse(req,function(err,fields,files){
		var postData = {};
		var type = fields.type;
		var tmpPath = files.picFile.path;
		var imgType = files.picFile.type;
		var tmp_name = upload.imgUploadName(imgType);
		var targetPath = 'public/images/pic/'+type+'/'+tmp_name;
		upload.imgUpload(tmpPath,targetPath);
		postData.picUrl = common.getPicHost()+'/images/pic/'+type+'/'+tmp_name;
		postData.instruction = fields.instruction;
		$picServ.addPic(type,postData).then((data)=>{
			res.json(data)
		}).catch((msg)=>{
			logger.error(msg)
		})
	});
});
router.post('/pic/editPic',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/pic';
	form.parse(req,function(err,fields,files){
		var postData = {};
		var type = fields.type;
		var id = fields.id;

		var tmpPath = files.picFile.path;
		if(files.picFile.size > 0){
			var imgType = files.picFile.type;
			var tmp_name = upload.imgUploadName(imgType);
			var targetPath = 'public/images/pic/'+type+'/'+tmp_name;
			upload.imgUpload(tmpPath,targetPath);
			postData.picUrl = common.getPicHost()+'/images/pic/'+type+'/'+tmp_name;
			// 删除之前图片
			var picUrl = fields.picUrl;
			var picUrlArr = picUrl.split('/');
			var targetPath = 'public/images/pic/'+type+'/'+picUrlArr[(picUrlArr.length)-1];
			upload.imgDel(targetPath);
		}else{
			upload.imgDel(tmpPath);
			postData.picUrl = fields.picUrl;
		}
		postData.instruction = fields.instruction;
		$picServ.editPic(type,id,postData).then((data)=>{
			res.json(data)
		}).catch((msg)=>{
			logger.error(msg)
		})
	});
});
/*pic end*/
/*blog start*/
router.get('/blog/getBlogList',function(req,res,next){
	var type = req.query.type,
		id = req.query.id;
	$blogServ.getBlogList(type,id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/blog/delBlog',function(req,res,next){
	var id = req.body.id;
	var picUrl = req.body.picUrl;
	var picUrlArr = picUrl.split('/');
	var targetPath = 'public/images/blog/'+picUrlArr[(picUrlArr.length)-1];
	upload.imgDel(targetPath);
	$blogServ.delBlog(id).then((data)=>{
		res.json(data)
	}).catch((msg)=>{
		logger.error(msg)
	})
});
router.post('/blog/addBlog',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/blog';
	form.parse(req,function(err,fields,files){
		var postData = {};
		var tmpPath = files.blogPicFile.path;
		var imgType = files.blogPicFile.type;
		var tmp_name = upload.imgUploadName(imgType);
		var targetPath = 'public/images/blog/'+tmp_name;
		upload.imgUpload(tmpPath,targetPath);
		postData.category = fields.category;
		postData.title = fields.title;
		postData.author = fields.author;
		postData.content = fields.content;
		postData.picUrl = common.getPicHost()+'/images/blog/'+tmp_name;
		postData.keywords = fields.keywords;
		$blogServ.addBlog(postData).then((data)=>{
			res.json(data)
		}).catch((msg)=>{
			logger.error(msg)
		})
	})
});
router.post('/blog/updateBlog',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/blog';
	form.parse(req,function(err,fields,files){
		logger.info(fields);
		var postData = {};
		var id = fields.id;
		postData.category = fields.category;
		postData.title = fields.title;
		postData.author = fields.author;
		postData.content = fields.content;
		postData.brief = fields.brief;
		postData.keywords = fields.keywords;
		// 如果重新上传了图片  则删除原来图片
		var tmpPath = files.blogPicFile.path;
		if(files.blogPicFile.size > 0){
			var imgType = files.blogPicFile.type;
			var tmp_name = upload.imgUploadName(imgType);
			var targetPath = 'public/images/blog/'+tmp_name;
			upload.imgUpload(tmpPath,targetPath);
			postData.picUrl = common.getPicHost()+'/images/blog/'+tmp_name;
			// 删除之前图片
			var picUrl = fields.picUrl;
			var picUrlArr = picUrl.split('/');
			var targetPath = 'public/images/blog/'+picUrlArr[(picUrlArr.length)-1];
			upload.imgDel(targetPath);
		}else{
			upload.imgDel(tmpPath);
			postData.picUrl = fields.picUrl;
		}
		$blogServ.updateBlog(postData,id).then((data)=>{
			res.json(data)
		}).catch((msg)=>{
			logger.error(msg)
		})
	})
});
/*blog end*/
module.exports = router;