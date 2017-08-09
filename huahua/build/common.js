var path = require('path')
var log4js = require('log4js')

/*
log4
*/
module.exports = function(){
	log4js.configure(path.join(__dirname,'log4.conf.json'))
}