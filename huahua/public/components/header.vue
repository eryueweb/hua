<template>
	<div id="header" class="clearfix" :class="{scrollHeaderBg: isScrollClass}">
		<h1 class="logoItem"><router-link to="/" :class="{scrollLogo:isScrollClass}"></router-link></h1>
		<div class="nav">
			<ul class="nav-ul clearfix">
				<li v-for="(navVal,navKey) in navItems" class="navItem">
					<router-link :to="{name:navKey}" :class="{scrollHeaderColor:isScrollClass}">{{navVal}}</router-link>
				</li>
			</ul>
		</div>
		<div class="search" v-show="isScrollClass">
			<form action="" class="search-form">
				<p class="search-w">
					<input type="text" autocomplete="off" name="toSearch" id="toSearch" v-model="query" placeholder="搜索你喜欢的" @focus="isShowResult=true">
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
	const NAV_CONVERT = {'pic': '图','blog':'文'};
	// ,'state': '广播'
	export default{
		name: 'v-header',
		data(){
			return {
				navItems: NAV_CONVERT,
				isScrollClass: false,
				currentRoute: window.location.hash.substring(1),
				query: '',
				searchListData: [],
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
			window.addEventListener('popstate',this.getCurrentRoute);
			this.isScroll();
			this.getSearchData();
		},
		methods: {
			headerScroll(){
				var wScrollY = window.scrollY || document.documentElement.scrollTop;
				if(this.currentRoute == '/'){
					if(wScrollY >= 300){
						this.isScrollClass = true
					}else{
						this.isScrollClass = false
					}
				}
			},
			isScroll(){
				if(this.currentRoute == '/'){
					this.isScrollClass = false;
				}
				else{
					this.isScrollClass = true;
				}
				window.addEventListener('scroll',this.headerScroll)
			},
			getCurrentRoute(){
				this.currentRoute = window.location.hash.substring(1);
				this.isScroll();
			},
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
				e.target.style.backgroundColor = '#F2F2F2';
			},
			mouseLeaveSearchItem(e){
				e.target.style.backgroundColor = 'transparent';
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
	#header{position: fixed;top: 0;left: 0;z-index: 10000;width: 100%;min-width: 1400px;height: 48px;}
	.nav{float: left;}
	.nav-ul li{float: left;margin-left: 15px;margin-right: 15px;}
	li.navItem{margin-top: 17px;margin-bottom: 17px;}
	h1.logoItem{float: left;margin: 13px 15px 0;}
	h1.logoItem a{display: block;width: 50px;height: 24px;background-image: url(../images/logo_2.png);background-size: 50px 24px;}
	.nav-ul li a{color: rgba(255,255,255,.85);}
	.search{float: left;margin-top: 6px;margin-left: 150px;}
	.search-w{position: relative;}
	#toSearch{background-color: #fafafa;border: 1px solid #ddd;border-radius: 2px;padding: 0px 6px 0px 12px;outline: none;color: #bbb;font-size: 14px;height: 32px;width: 700px;}
	.to-ret{position: absolute;top: 7px;right: 8px;}
	i.fa-search{color: #c6c6c6;}

	.search-result{background-color: #fff;color: #444;box-shadow:0 0 2px rgba(0,0,0,.2);}
	.search-result-item{line-height: 30px;padding-left: 10px;}
	.search-result-item a{display: block;color: #444;}

	.scrollHeaderBg{background-color: #fff;box-shadow: 0 0 4px rgba(0,0,0,.2);}
	.scrollHeaderColor{color: rgb(68,68,68)!important;}
	.scrollLogo{background-image: url(../images/logo.png)!important;}
</style>