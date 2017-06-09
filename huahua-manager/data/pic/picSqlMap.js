'use strict';
let pic = function(){
	this.getPicList=(type,id)=>{
		if(id){
			return 'select * from '+type+'_pic where id='+id
		}else{
			return 'select * from '+type+'_pic'
		}
	},
	this.delPic=(type,id)=>{
		return 'delete from '+type+'_pic where id='+parseInt(id)
	},
	this.addPic=(type)=>{
		return 'insert into '+type+'_pic set ?'
	},
	this.editPic=(type,id)=>{
		return 'update '+type+'_pic set ? where id='+id
	}	
};
module.exports = new pic();