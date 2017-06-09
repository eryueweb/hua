module.exports = {
	getHost: function(){
		return global.appConfig.host
	},
	getPicHost: function(){
		return global.appConfig.picHost
	},
	isProMode: function(){
		return global.appConfig.envMode === 'pro'
	},
	isDevMode: function(){
		return global.appConfig.envMode === 'dev'
	}
}