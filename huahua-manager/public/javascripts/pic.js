"use strict";
function pic(){
	this.type = 'animal';
	this.$picBox = $('.pic-manager');
	this.$picAddDialog = $('.pic-add-dialog');
	this.$picEditDialog = $('.pic-edit-dialog');
	this.$picListBox = $('.pic-table tbody');
	this.picList_tpl = $('#picList_tpl').text();
	this.init()
}
pic.prototype = {
	init: function(){
		var _this = this;
		_this.sidBar();
		_this.renderPicList(_this.type);
		_this.addPic();
		_this.editPic();
		_this.delPic();
	},
	sidBar: function(){
		var _this = this;
		$('.sideBar a').on('click',function(){
			_this.type = $(this).data('type');
			$(this).addClass('pic-current').parent().siblings().find('a').removeClass('pic-current');

			_this.$picAddDialog.find('input#type').val(_this.type);
			_this.renderPicList(_this.type);
		})
	},
	renderPicList: function(type){
		var _this = this;
		$.getJSON('/data/pic/getPicList',{type:type},function(info){
			var picListHTML = $(Mustache.render(_this.picList_tpl,{
				items: info
			}));
			_this.$picListBox.html(picListHTML);	
		})
	},
	addPic: function(){
		var _this = this;
		_this.$picBox.on('click','.addBtn',function(){
			_this.$picAddDialog.show();
		});
		/*
		* 表单提交
		*/
		$('form.form-addPic').submit(function(e){
			e.preventDefault();
			var formData = new FormData(this);
			$.ajax({
				type: 'post',
				url: '/data/pic/addPic',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
		        cache: false,
		        processData: false
			}).then(function(msg){
				_this.$picAddDialog.hide();
				_this.renderPicList(_this.type)
			},function(err){
				console.error(err)
			})
		})
	},
	editPic: function(){
		var _this = this;
		_this.$picBox.on('click','.editBtn',function(e){
			let id = $(e.target).data('id');
			_this.$picEditDialog.show();
			$.getJSON('/data/pic/getPicList',{type:_this.type,id:id},function(info){
				let formData = info[0];	
				$.each(formData,function(key,val){
					$('form.form-editPic').find('*[name="'+key+'"]').val(val);
					if(key == 'content'){
						_this.blogEditor.$txt.html(val);
					}
				})		
			})
		});
		/*
		* 表单提交
		*/
		$('form.form-editPic').submit(function(e){
			e.preventDefault();
			var formData = new FormData(this);
			$.ajax({
				type: 'post',
				url: '/data/pic/editPic',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
		        cache: false,
		        processData: false
			}).then(function(msg){
				_this.$picEditDialog.hide();
				_this.renderPicList(_this.type)
			},function(err){
				console.error(err)
			})
		})
	},
	delPic: function(){
		var _this = this;
		_this.$picListBox.on('click','.delBtn',function(e){
			var id = $(e.target).data('id');
			var picUrl = $(e.target).data('url');
			var isDel = confirm('确认删除？');
			if(isDel){
				$.post('/data/pic/delPic',{'type':_this.type,'id':id,'picUrl':picUrl},function(info){
					_this.renderPicList(_this.type)
				})
			}
		})
	}
};
new pic();