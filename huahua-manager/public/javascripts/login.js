'use strict';
require('../stylesheets/login.css');
function login(){
	this.$userName = $('input#userName');
	this.$password = $('input#password');
	this.init()
}
login.prototype = {
	init: function(){
		this.toLogin()
	},
	toLogin: function(){
		var _this = this;
		/*
		* 表单提交
		*/
		$('form.form-login').submit(function(e){
			e.preventDefault();
			var params = {
				userName: _this.$userName.val(),
				password: _this.$password.val()
			}
			if($.trim(params.userName)=='' || $.trim(params.password)==''){
				alert('用户名或密码不能为空！');
				return false
			}else{
				console.log(params);
				$.post('/login',params,function(res){
					console.log(res);
					if(res.success){
						window.location.href = "/home";
					}else{
						alert('用户名或密码错误！')
					}
				})
			}
		})
	}
};
new login();
