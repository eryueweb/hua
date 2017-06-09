let log4js = require('log4js');
let logger = log4js.getLogger('util');
module.exports = {
	timeConvert: function(time){
		var _this = this;
		var year = time.getFullYear(),
			month = _this.toTwoNum(time.getMonth()+1),
			day = _this.toTwoNum(time.getDate()),
			hour = _this.toTwoNum(time.getHours()),
			minutes = _this.toTwoNum(time.getMinutes()),
			seconds = _this.toTwoNum(time.getSeconds());

		return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
	},
	toTwoNum: function(x){
		if(x<10){
			return 0+''+x
		}else{
			return x
		}
	}
}