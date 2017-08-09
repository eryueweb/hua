<template>
	<div class="head clearfix">
		<div class="banner-bg" :style="styleBannerBg"></div>
		<h1><img src="../assets/img/logo_2.png" alt="花花" width="80px"></h1>
		<div id="search">
			<form action="" name="search-form">
				<p class="search-w">
					<input type="text" id="q" autocomplete="off" v-model="query" placeholder="搜索你喜欢的"  @focus="isShowResult=true" />
					<span class="to-ret"><i class="fa fa-search fa-lg"></i></span>
				</p>
				<transition-group name="staggered-fade" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave" class="search-result" v-show="isShowResult">
					<li v-for="(item,index) in searchList" :key="item.info" :data-index="index" class="search-result-item" @mouseenter='mouseEnterSearchItem' @mouseleave='mouseLeaveSearchItem' @click="toSearch(item.info)"><router-link :to="{name:item.routerName,params:item.params}">{{item.info}}（{{item.type}}）</router-link></li>
				</transition-group>
			</form>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'v-banner',
		data(){
			return {
				query: '',
				searchListData: [],
				styleBannerBg: {
					'background-image': ''
				},
				isShowResult: true
			}
		},
		computed: {
			searchList(){
				let vm = this;
				if(vm.query){
					return vm.searchListData.filter((item)=>{
						let flag = false;
						if(item.keywords){
							item.keywords.forEach(function(val,i){
								if(val.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1){
									flag = true;
								}
							})
						}
						return flag
					})
				}
			}
		},
		mounted(){
			this.updateBanner();
			this.getSearchData();
		},
		methods: {
			beforeEnter(el){
				el.style.opacity = 0;
			},
			enter(el,done){
				el.style.opacity = 1;
				done()
			},
			leave(el,done){
				el.style.opacity = 0;
				done()
			},
			mouseEnterSearchItem(e){
				e.target.style.backgroundColor = 'rgba(0,0,0,.45)';
			},
			mouseLeaveSearchItem(e){
				e.target.style.backgroundColor = 'transparent';
			},
			updateBanner(){
				let vm = this;
				vm.$http.get('/data/banner').then(response=>{
					let picUrl = response.body[0].picUrl;
					this.styleBannerBg['background-image'] = 'url('+picUrl+')'
				})
			},
			toSearch(info){
				this.query = info;
				this.isShowResult = false;
			},
			getSearchData(){
				let vm = this;
				vm.$http.get('/data/blog/getAllBlog').then(response=>{
					let data = response.body;
					data.forEach(function(val,i){
						var jsonMsg = {};
						jsonMsg.id = val.id;
						jsonMsg.type = '文';
						jsonMsg.params = {'id':val.id};
						jsonMsg.routerName = 'blogDetail';
						if(val.keywords){
							jsonMsg.keywords = val.keywords.split(',');
						}else{
							jsonMsg.keywords = [];
						}
						jsonMsg.info = val.title;
						vm.searchListData.push(jsonMsg);
					})
				});
				vm.$http.get('/data/pic/getAllPic/latest').then(response=>{
					let data = response.body;
					data.forEach(function(val,i){
						var jsonMsg = {};
						jsonMsg.id = val.id;
						jsonMsg.type = '图';
						jsonMsg.params = {'type':val.type,'id':val.id};
						jsonMsg.routerName = 'picView';
						if(val.instruction){
							jsonMsg.keywords = val.instruction.split(' ');
						}else{
							jsonMsg.keywords = [];
						}
						jsonMsg.info = val.instruction;
						vm.searchListData.push(jsonMsg);
					})
				});
			}
		}
	}
</script>
<style scoped>
	.head{position: relative;height: 480px;}
	.banner-bg{position: absolute;width: 100%;height: 100%;background-size: cover;}
	h1{position: absolute;width: 100%;text-align: center;color: #fff;margin-top: 120px;}
	#search{position: relative;left: 50%;margin-left: -245px;width: 490px;top: 190px;}
	.search-w{display: inline-block;position: relative;}
	#q{background-color: rgba(0,0,0,.15);border: 1px solid #fff;padding: 4px 32px 4px 6px;outline: none;color: #fff;font-size: 16px;line-height: 22px;width: 450px;}
	.to-ret{position: absolute;top: 7px;right: 8px;}
	i.fa-search{color: #fff;}

	.search-result{background-color: rgba(0,0,0,.4);color: #fff;}
	.search-result-item{line-height: 30px;padding-left: 10px;}
	.search-result-item a{display: block;color: #fff;}
</style>