<template>
	<div class="container">
		<div class="top-Box">
			<img :src="detailData.picUrl" class="top-bg">
			<div class="overlay"></div>
		</div>
		<div class="main wangEditor-container">
			<div class="title-wraper">
				<p class="date">{{detailData.periodConvert}}</p>
				<h2 class="title">{{detailData.title}}</h2>
				<p class="authorW">by <span class="author">{{detailData.author}}</span></p>
			</div>
			<div class="content wangEditor-txt" v-html="detailData.content"></div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'blog-detail',
		data(){
			return {
				detailData: {}
			}
		},
		watch: {
			'$route': 'renderBlogDetail'
		},
		created(){
			document.body.style.backgroundColor = '#f7f7f7'
		},
		mounted(){
			let vm = this;
			vm.renderBlogDetail()
		},
		methods: {
			renderBlogDetail(){
				let vm = this,
					id = vm.$route.params.id;
				vm.$http.get('data/blog/detail/'+id).then(response=>{
					vm.detailData = response.body[0];
				})
			}
		}
	}
</script>
<style scoped>
	@import '../stylesheets/wangeditor/css/wangEditor.min.css';
	.container{margin-top: 48px;}
	.top-Box{position: relative;}
	.top-bg{width: 100%;height: 500px;object-fit: cover;}
	.overlay{position: absolute;left: 0;top: 0;z-index: 100;width: 100%;height: 500px;background:rgba(0, 0, 0, .2);}
	.main{position: absolute;top: 200px;left: 50%;z-index: 200;margin-left: -500px;width: 1000px;}
	h2.title{line-height: 60px;font-size: 32px;color: #fff;}
	.date,.authorW{color: rgba(255,255,255,.7);}
	.authorW span{color: rgba(255,255,255,.7);}
	.content{margin-top: 80px;margin-bottom: 100px;padding: 30px 15px;background-color: #fff;}
	.content p{line-height: 20px;padding: 10px 0;}
</style>