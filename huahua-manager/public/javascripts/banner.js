'use strict';
function banner(){
	this.$bannerBox = $('.banner-manager');
	this.$bannerListBox = $('.banner-table tbody');
	this.bannerList_tpl = $('#bannerList_tpl').text();

	this.init()
}
banner.prototype = {
	init: function(){
		this.getBannerList();
		this.delBannerPic();
		this.addBannerPic();
	},
	getBannerList: function(){
		var _this = this;
		$.getJSON('/data/banner/getBannerList',{},function(info){
			var bannerListHTML = $(Mustache.render(_this.bannerList_tpl,{
				items: info
			}));
			_this.$bannerListBox.html(bannerListHTML);		
		})
	},
	delBannerPic: function(){
		var _this = this;
		_this.$bannerListBox.on('click','.delBtn',function(e){
			var id = $(e.target).data('id');
			var picUrl = $(e.target).data('url');
			var isDel = confirm('确认删除？');
			if(isDel){
				$.post('/data/banner/delBannerPic',{'id':id,'picUrl':picUrl},function(info){
					_this.getBannerList()
				})
			}
		})
	},
	addBannerPic: function(){
		var _this = this;
		_this.$bannerBox.on('click','.addBtn',function(e){
			$('.banner-dialog').show();
		});
		/*
		**表单提交
		*/
		$('.form-addBanner').submit(function(e){
			e.preventDefault();
			var formData = new FormData(this);
			$.ajax({
				type: 'post',
				url: '/data/banner/addBannerPic',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
		        cache: false,
		        processData: false
			}).then(function(msg){
				$('.banner-dialog').hide();
				_this.getBannerList()
			},function(err){
				console.error(err);
			})
		})
	}
};
new banner();