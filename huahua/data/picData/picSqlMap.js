let log4js = require('log4js');
let logger = log4js.getLogger('picSqlMap');
let pic = function(){
	this.getPic = (type,page,pageSize)=>{
		if(type=='latest'){
			return 'select * from scenery_pic UNION ALL select * from animal_pic UNION ALL select * from character_pic  UNION ALL select * from comic_pic ORDER BY collectDate DESC limit '+(page-1)*pageSize+','+pageSize;
		}else{
			return 'select * from '+type+'_pic order by collectDate DESC limit '+(page-1)*pageSize+','+pageSize;
		}
	},
	this.getAllPic = (type)=>{
		if(type=='latest'){
			return 'select id,type,instruction,collectDate from scenery_pic UNION ALL select id,type,instruction,collectDate from animal_pic UNION ALL select id,type,instruction,collectDate from character_pic  UNION ALL select id,type,instruction,collectDate from comic_pic ORDER BY collectDate DESC';
		}else{
			return 'select id,type,instruction from '+type+'_pic order by collectDate DESC';
		}
	},
	this.getPicView = (type,id)=>{
		return 'select * from '+type+'_pic where id='+id;
	},
	this.toHeart = (type,id)=>{
		return 'update '+type+'_pic set heartNum=heartNum+1 where id='+id
	}
};
module.exports = new pic();
