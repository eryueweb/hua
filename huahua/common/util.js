var common = function(){
	this.timeConvert = (time)=>{
		var _this = this;
		var year = time.getFullYear(),
			month = _this.toTwoNum(time.getMonth()+1),
			day = _this.toTwoNum(time.getDate()),
			hour = _this.toTwoNum(time.getHours()),
			minutes = _this.toTwoNum(time.getMinutes()),
			seconds = _this.toTwoNum(time.getSeconds());

		return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
	},
	this.toTwoNum = (x)=>{
		if(x<10){
			return 0+''+x
		}else{
			return x
		}
	},
	this.periodConvert = (preTime)=>{
		var _this = this;
		var nowTemp = Date.parse(new Date()),
			preTemp = Date.parse(preTime),
			timeDif = nowTemp - preTemp;
		switch(true)
		{
			case ((timeDif/1000) < 60):
				return '刚刚';
				break;
			case ((timeDif/1000/60) < 60):
				return parseInt(timeDif/1000/60)+'分钟前';
				break;
			case ((timeDif/1000/60/60) < 24):
				return parseInt(timeDif/1000/60/60)+'小时前';
				break;
			case ((timeDif/1000/60/60/24) < 30):
				return parseInt(timeDif/1000/60/60/24)+'天前';
				break;
			default:
				return _this.timeConvert(preTime)
		}
	}
};
module.exports = new common();