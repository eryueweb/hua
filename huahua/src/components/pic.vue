<template>
	<div>
		<pic-view :is-close="isPicView" :active-type="activeType" v-if="isPicView" @close="picView()"></pic-view>
		<div class="container">
			<div class="header">
				<div class="header-t"><span>{{picTabListData[activeType]}}</span></div>
				<div class="tab">
					<ul class="tab-ul clearfix" :class="activeType">
						<li v-for="(picTabVal,picTabKey) in picTabListData">
							<a :to='picTabKey' href="javascript:" :class="picTabKey" @click="changeNav(picTabKey)">{{picTabVal}}</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="main">
				<pic-waterfall :active-type="activeType" :is-view="isPicView" @picView="picView">
				</pic-waterfall>
			</div>
		</div>
	</div>
</template>
<script>
	import picView from '@/components/picView';
	import picWaterfall from '@/components/picWaterfall';

	const picTabListData = {latest: '最新',animal: '萌宠',comic: '漫画',scenery: '美景',character: '美人'};

	export default{
		name: 'v-pic',
		components: {
			picView,
			picWaterfall
		},
		data(){
			return {
				isPicView: false,   //是否是查看图片页面
				picType: '',    //当前查看或即将查看的图片类型
				picId: '',	    //当前查看或即将查看的图片ID
				activeType: 'latest',
				picTabListData: picTabListData
			}
		},
		watch: {
			'$route': 'viewInit'
		},
		created(){
			document.body.style.backgroundColor = '#f7f7f7';
		},
		mounted(){
			let vm = this;
			// 必须在函数内调用方法才会生效
			// window.addEventListener('scroll',function(){vm.scrollLoad()});
			// 页面初始化－－－根据路径参数判断是否展示picView
			vm.viewInit();
		},
		methods: {
			viewInit(){
				let vm = this;
				if(vm.$route.params.id){
					let _id = vm.$route.params.id,
						_type = vm.$route.params.type;
					vm.$http.get('/data/pic/getAllPic/'+_type).then(response=>{
						let _data = response.body;
						_data.forEach(function(val,index){
							if(val.id == _id){
								vm.mouseenterHeart(_type,_id,index);
								vm.picView();
							}
						})
					});
				}
			},
			// 导航切换
			changeNav(activeType){
				this.activeType = activeType;
			},
			// 查看pic
			picView(){
				if(this.isPicView){
					document.body.style.overflow = 'auto';
					window.location.href = '/#/pic'
				}
				this.isPicView = !(this.isPicView);
			}
		}
	}
</script>
<style scoped>
	.header{padding-top: 48px;background-image: url(../assets/img/sea.jpg);background-size: cover;text-align: center;}
	.header-t{position: relative;display: inline-block;padding: 30px 0;width: 300px;color: #444;font-size: 30px;}
	.header-t span:before{position: absolute;top: 48px;left: 0;display: inline-block;width: 100px;content: '';border-top: 1px solid #ededed;}
	.header-t span:after{position: absolute;top: 48px;right: 0;display: inline-block;width: 100px;content: '';border-top: 1px solid #ededed;}
	.tab{width: 500px;margin: 0 auto;}
	.tab-ul li{float: left;width: 60px;margin: 0 20px;}
	.tab-ul li a{display: block;padding: 10px 0;border-bottom: 1px solid transparent;}
	
	.tab-ul.latest .latest,.tab-ul.animal .animal,.tab-ul.comic .comic,.tab-ul.scenery .scenery,.tab-ul.character .character{font-weight: bold;border-bottom-color: #c90000;}

	.flowall{position: relative;min-height: 500px;width: 1400px;margin: 16px auto;-webkit-column-width: 236px;-webkit-column-gap: 5px;}
	.picbox{position: relative;display: inline-block;margin: 2px;width: 236px;}
	.img-w{position: relative;display: inline-block;}
	.img-w img{width: 100%;}
	.text-w{padding: 10px;font-size: 12px;color: #444;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;}
	.rate{padding: 0 10px 10px;}
	.like{padding: 0 6px;color: #8c7e7e;font-size: 12px;}
	.action{position: absolute;z-index: 10;top: 6px;right: 6px;padding: 6px 8px;border: 1px solid rgba(0,0,0,.2);}
	.actionBg{background: linear-gradient(#fafafa,#f2f2f2);}
	.actionHoverBg{background: #fff;}
	.isHeart{color: #f00;}
	.noHeart{color: #A6A6A6;}
	.fa-heart.like-act{color: #f00;}
	.cover{position:absolute;z-index: 2;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255,255,255,.1);}

	.main{position: relative;min-width: 1200px;}
</style>