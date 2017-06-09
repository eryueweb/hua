'use strict';
require('../stylesheets/index.css');
function home(){
	this.$tab = $('.manager-tab');
	this.init()
}
home.prototype = {
	init: function(){
		this.nav()
	},
	nav: function(){
		$('div.banner-manager').show();
		this.$tab.on('click','li',function(){
			var _id = $(this).attr('id');
			$(this).addClass('current').siblings().removeClass('current');
			$('div.'+_id).show().siblings().hide()
		})
	}
};
new home();
