'use strict';
require('../stylesheets/style.css');
window.Mustache = require('mustache');
// 注意引用顺序
window.wangEditor = require('wangeditor');
window.$ = window.jquery = require('jquery');
function common(){
	this.init()
}
common.prototype = {
	init: function(){
		this.dialog()
	},
	dialog: function(){
		var _this = this;
		$('.dialog').on('click',function(e){
			$(this).hide()
		});
		$('.dialog-con').on('click',function(e){
			e.stopPropagation()
		});
	}
};
new common();