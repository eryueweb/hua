let banner = function(){
	this.getBannerPic=()=>{
		return 'select * from banner ORDER BY RAND() LIMIT 1'
	}
}
module.exports = new banner();