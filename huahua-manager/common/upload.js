let fs = require('fs');
let log4js = require('log4js');
let logger = log4js.getLogger('upload');
module.exports =  {
	imgUploadName: function(type){
		var extension_name = "";
		var tmp_name = (Date.parse(new Date())/1000);
			tmp_name = tmp_name+''+(Math.round(Math.random()*9999));
		switch(type){
			case 'image/pjpeg': extension_name = 'jpg';
				break;
			case 'image/jpeg': extension_name = 'jpg';
				break;
			case 'image/gif': extension_name = 'gif';
				break;
			case 'image/png': extension_name = 'png';
				break;
			case 'image/x-png': extension_name = 'png';
				break;
			case 'image/bmp': extension_name = 'bmp';
				break;
		}
		tmp_name = tmp_name+'.'+extension_name;
		return tmp_name;
	},
	imgUpload: function(tmpPath,targetPath){
		/*修改文件名称，更改文件的存放路径*/
		fs.renameSync(tmpPath,targetPath,function(err){
			if(err){
				logger.error(err);
			}
			logger.info('更改路径成功');
			/*删除默认的上传文件*/
			fs.unlink(tmpPath,function(err){
				if(err){
					logger.error(err);
				}
				logger.info('删除成功');
			});
		});
	},
	imgDel: function(targetPath){
		fs.unlink(targetPath,function(err){
			if(err){
				logger.error(err);
			}
			logger.info('删除成功');
		});
	}
}