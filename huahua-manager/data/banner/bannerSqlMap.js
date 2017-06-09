'use strict';
let banner = function(){
	this.getBannerList=(id)=>{
		if(id){
			return 'select * from banner where id='+parseInt(id)
		}else{
			return 'select * from banner'
		}
	},
	this.delBannerPic=(id)=>{
		return 'delete from banner where id='+parseInt(id)
	},
	this.addBannerPic=()=>{
		return 'insert into banner set ?'
	}	
}
module.exports = new banner();