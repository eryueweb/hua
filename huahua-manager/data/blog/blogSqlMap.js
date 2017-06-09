'use strict';
let blog = function(){
	this.getBlogList=(type,id)=>{
		if(id){
			return 'select * from article_table where id='+parseInt(id)
		}else{
			if(type){
				return 'select * from article_table where type='+type
			}else{
				return 'select * from article_table'
			}
		}
	},
	this.delBlog=(id)=>{
		return 'delete from article_table where id='+parseInt(id)
	},
	this.addBlog=()=>{
		return 'insert into article_table set ?'
	},
	this.updateBlog=(id)=>{
		return 'update article_table set ? where id='+id
		
	}	
};
module.exports = new blog();