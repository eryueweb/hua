'use strict';
function blog(){
	this.$blogBox = $('.blog-manager');
	this.$blogListBox = $('.blog-table tbody');
	this.blogList_tpl = $('#blogList_tpl').text();
	this.blogEditor = new wangEditor('blogEditor');
	this.blogEditorAdd = new wangEditor('blogEditorAdd');
	this.blogEditor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
        if (item === 'location') {
            return null;
        }
        return item;
    });
    this.blogEditorAdd.config.menus = $.map(wangEditor.config.menus, function(item, key) {
        if (item === 'location') {
            return null;
        }
        return item;
    });
	this.blogEditor.create();
	this.blogEditorAdd.create();
	this.init();
}
blog.prototype = {
	init: function(){
		this.renderBlogList();
		this.addBlog();
		this.editBlog();
		this.delBlog();
	},
	renderBlogList: function(){
		var _this = this;
		$.getJSON('/data/blog/getBlogList',{},function(info){
			var blogListHTML = $(Mustache.render(_this.blogList_tpl,{
				items: info
			}));
			_this.$blogListBox.html(blogListHTML);		
		})
	},
	addBlog: function(){
		var _this = this;
		_this.$blogBox.on('click','.addBtn',function(){
			$('.blog-add-dialog').show();
			$('form.form-add-blog #blogReset').trigger('click');
		});
		$('form.form-add-blog').submit(function(e){
			e.preventDefault();
			let strHtml = _this.blogEditorAdd.$txt.html();
			let strText = _this.blogEditorAdd.$txt.text();
			$('form.form-add-blog input[name="content"]').val(strHtml);
			$('form.form-add-blog input[name="brief"]').val(_this.strSub(strText,260));
			var formData = new FormData(this);
			$.ajax({
				type: 'post',
				url: '/data/blog/addBlog',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
		        cache: false,
		        processData: false
			}).then(function(msg){
				$('.blog-add-dialog').hide();
				_this.renderBlogList();
			},function(err){
				console.error(err);
			})
		});
	},
	delBlog: function(){
		var _this = this;
		_this.$blogListBox.on('click','.delBtn',function(e){
			var id = $(e.target).data('id');
			var picUrl = $(e.target).data('url');
			var isDel = confirm('确认删除？');
			if(isDel){
				$.post('/data/blog/delBlog',{'id':id,'picUrl':picUrl},function(info){
					_this.renderBlogList()
				})
			}
		})
	},
	editBlog: function(){
		var _this = this;
		_this.$blogListBox.on('click','.editBtn',function(e){
			let id = $(e.target).data('id');
			$('.blog-edit-dialog').show();
			$('form.form-edit-blog #blogReset').trigger('click');
			$.getJSON('/data/blog/getBlogList',{id:id},function(info){
				let formData = info[0];	
				$.each(formData,function(key,val){
					$('form.form-edit-blog').find('*[name="'+key+'"]').val(val);
					if(key == 'content'){
						_this.blogEditor.$txt.html(val);
					}
				})		
			})
		});
		$('form.form-edit-blog').submit(function(e){
			e.preventDefault();
			let strHtml = _this.blogEditor.$txt.html();
			let strText = _this.blogEditor.$txt.text();
			console.log(strText);
			$('form.form-edit-blog input[name="content"]').val(strHtml);
			$('form.form-edit-blog input[name="brief"]').val(_this.strSub(strText,260));
			var formData = new FormData(this);
			$.ajax({
				type: 'post',
				url: '/data/blog/updateBlog',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
		        cache: false,
		        processData: false
			}).then(function(msg){
				$('.blog-edit-dialog').hide();
				_this.renderBlogList()
			},function(err){
				console.error(err)
			})
		})
	},
	strByteLen: function(str){
		let byteLen = 0;
		for(let i=0,len=str.length;i<len;i++){
			if(str.charCodeAt(i)>255){
				byteLen+=2
			}else{
				byteLen++
			}
		}
		return byteLen;
	},
	strSub: function(str,subLen){
		let byteLen = 0;
		let realLen = 0;
		let strLen = this.strByteLen(str);
		if(strLen>subLen){
			for(let i=0;i<strLen;i++){
				if(str.charCodeAt(i)>255){
					byteLen+=2
				}else{
					byteLen++
				}
				if(byteLen>=subLen){
					realLen = i;
					break
				}
			}
			return (str.substring(str,realLen)+'...');
		}else{
			realLen = strLen;
			return str.substring(str,realLen);
		}
	}
};
new blog();