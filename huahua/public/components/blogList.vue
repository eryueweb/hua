<template>
	<div class="container">
		<div class="blog">
			<!-- <div class="search-box">
				<ul class="clearfix">
					<li class="search-label" v-for="searchItem in searchItemData">
						<a href="javascript:"><label>{{searchItem.label}}</label><span>{{searchItem.amount}}</span></a>	
					</li>
					<li class="more"><a href="javascript:">更多</a></li>
				</ul>
			</div> -->
			<div class="article-box">
				<div class="article-top clearfix"><h2 class="a-now">最新文章</h2><span class="title-line"></span></div>
				<div class="article-list">
					<ul>
						<li class="clearfix" v-for="articleItem in articleList">
							<div class="a-l">
								<router-link :to="{name:'blogDetail',params:{id:articleItem.id}}" class="link-info linkPic-info">
									<img :src="articleItem.picUrl">
								</router-link>
							</div>
							<div class="a-r">
								<router-link :to="{name:'blogDetail',params:{id:articleItem.id}}" class="link-info">
									<h3>{{articleItem.title}}</h3>
									<p class="a-d">{{articleItem.brief}}<span class="fullText">查看全文></span></p>
									<div class="a-info clearfix">
										<p class="a-info-l"><span>{{articleItem.author}}</span>&nbsp;&nbsp;<span>发表于{{articleItem.periodConvert}}</span></p>
										<!-- <p class="a-info-r"><span>{{articleItem.praiseNum}}赞</span>&nbsp;&nbsp;<span>{{articleItem.commentNum}}条评论</span></p> -->
									</div>
								</router-link>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	const searchItemData = [{label: '全部',amount: 666},{label: '程序员',amount: 666}];
	export default{
		name: 'v-blog',
		data(){
			return {
				searchItemData: searchItemData,
				articleListData: [],
				isLoad: true,
				category: 'all',
				page: 1,
				pageSize: 10
			}
		},
		computed: {
			articleList(){
				return this.articleListData
			}
		},
		created(){
			document.body.style.backgroundColor = '#fff'
		},
		mounted(){
			let vm = this;
			vm.loadBlog();
		},
		methods: {
			loadBlog(){
				let vm = this;
				vm.$http.get('/data/blog/getBlog?category='+vm.category+'&page='+vm.page+'&pageSize='+vm.pageSize).then(response=>{
					if(response.body.length > 0){
						response.body.forEach(function(val,i){
							vm.articleListData.push(val);
						});
						if(response.body.length < 10){
							vm.isLoad = false
						}
					}else{
						vm.isLoad = false
					}
				})
			}
		}
	}
</script>
<style scoped>
	.container{padding-top: 48px;}
	.blog{margin: 0 auto;width: 660px;}
	.search-box{padding: 30px 0;}
	.search-box li{float: left;text-align: center;margin: 8px;}
	.search-box li a{display: block;padding: 0 15px;height: 30px;line-height: 30px;font-size: 14px;}
	.search-box li.search-label a{border: 1px solid rgba(0,0,0,.1);border-radius: 15px;color: gray;}
	.search-box li a span{margin-left: 3px;color: #b3b3b3;}

	.article-box{margin-top: 30px;}
	.article-top{position: relative;height: 30px;line-height: 30px;}
	.a-now{position: absolute;z-index: 100;font-size: 16px;padding-right: 16px;background-color: #fff;}
	.title-line{position: absolute;top: 14px;display: block;width: 100%;height: 1px;background-color: #f0f0f0;}
	.article-list{margin-top: 20px;}
	.article-list li{margin-bottom: 56px;}
	.article-list a.article-item-a{display: block;}
	.a-l{float: left;}
	.a-l img{width: 240px;height: 180px;object-fit: cover;border-radius: 4px;}
	.a-r{position: relative;float: left;width: 404px;height: 180px;}
	.linkPic-info{padding-right: 16px;}
	.link-info{display: block;}
	.link-info h3{font-size: 20px;line-height: 1.5;}
	.a-d{color: #666;line-height: 1.7;}
	.a-info{margin-top: 10px;width: 100%;}
	.a-info-l{float: left;}
	.a-info-r{float: right;}
	.fullText{color: #b3b3b3;}
</style>