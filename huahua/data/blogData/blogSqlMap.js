let log4js = require('log4js');
let logger = log4js.getLogger('blogSqlMap');
let blog = function(){
	this.getBlog = (category,page,pageSize)=>{
		if(category == 'all'){
			return 'select id,title,picUrl,author,createTime,brief from article_table order by createTime DESC limit '+(page-1)*pageSize+','+pageSize;
		}else{
			return 'select id,title,picUrl,author,createTime,brief from article_table where category='+category+' ORDER BY createTime DESC limit '+(page-1)*pageSize+','+pageSize;
		}
	},
	this.getAllBlog = ()=>{
		return 'select id,title,keywords from article_table order by createTime DESC '
	},
	this.getBlogDetail = (id)=>{
		return 'select * from article_table where id='+id
	}
};
module.exports = new blog();
