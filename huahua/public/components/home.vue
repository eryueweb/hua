<template>
	<div>
		<v-banner></v-banner>
		<div class="main">
			<div class="common-sort">
				<div class="line"><span>WELCOME ^_^</span></div>
				<ul class="common-sort-ul clearfix">
					<li v-for="commonSort in commonSortList">
						<div>
							<p><img :src="commonSort.picUrl" /></p>
							<!-- <p>{{commonSort.text}}</p> -->
						</div>
					</li>
				</ul>
			</div>
			<div class="favourite">
				<div class="line"><span>文</span></div>
				<ul class="favou-ul clearfix">
					<li class="clearfix animatebox" v-for="(favou,index) in favouListConvert" :class="favou.favouClassObj.outerClass">
						<router-link :to="{name:'blogDetail',params:{id:favou.id}}" class="link-info">
							<div :class="favou.favouClassObj.imgClass">
								<img :src="favou.picUrl" />
							</div>
							<div :class="favou.favouClassObj.textClass">
								<h3>{{favou.title}}</h3>
								<p class="article">{{favou.brief}}</p>
								<p class="article-data">
									<span class="author">{{favou.author}}</span>
									<span class="date">{{favou.periodConvert}}</span>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<div id="picpro" class="latest">
				<div class="line"><span>图</span></div>
				<div class="picpro-main">
					<div class="picpro-row clearfix" v-for="(picRowList,index) in picproListConvert" v-if="index%2 == 0">
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[0].type,id:picRowList[0].id}}" class="link-info"><img :src="picRowList[0].picUrl" width="240" height="240" /></router-link>
						</div>
						<div class="picpro-rembox">
							<div class="rem-infobox rem-infobox-l">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[0].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[0].author}}</span></p>
								</div>
							</div>
							<div class="rem-infobox rem-infobox-r">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[1].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[1].author}}</span></p>
								</div>
							</div>
						</div>
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[1].type,id:picRowList[1].id}}" class="link-info"><img :src="picRowList[1].picUrl" width="240" height="240" /></router-link>
						</div>
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[2].type,id:picRowList[2].id}}" class="link-info"><img :src="picRowList[2].picUrl" width="240" height="240" /></router-link>
						</div>
						<div class="picpro-rembox">
							<div class="rem-infobox rem-infobox-all all-t">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[2].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[2].author}}</span></p>
								</div>
							</div>
						</div>
					</div>
					<div class="picpro-row clearfix" v-for="(picRowList,index) in picproListConvert" v-if="index%2 != 0">
						<div class="picpro-rembox">
							<div class="rem-infobox rem-infobox-all all-b">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[0].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[0].author}}</span></p>
								</div>
							</div>
						</div>
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[0].type,id:picRowList[0].id}}" class="link-info"><img :src="picRowList[0].picUrl" width="240" height="240" /></router-link>
						</div>
						
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[1].type,id:picRowList[1].id}}" class="link-info"><img :src="picRowList[1].picUrl" width="240" height="240" /></router-link>
						</div>
						<div class="picpro-rembox">
							<div class="rem-infobox rem-infobox-l">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[1].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[1].author}}</span></p>
								</div>
							</div>
							<div class="rem-infobox rem-infobox-r">
								<div class="rem-data">
									<h3>花图</h3>
									<p class="picpro-t">{{picRowList[2].instruction}}</p>
									<p class="pic-author-w">来自<span>{{picRowList[2].author}}</span></p>
								</div>
							</div>
						</div>
						<div class="picpro-imgbox">
							<router-link :to="{name:'picView',params:{type:picRowList[2].type,id:picRowList[2].id}}" class="link-info"><img :src="picRowList[2].picUrl" width="240" height="240" /></router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="more-picbox"><router-link :to="{name:'pic'}" class="more-btn">加载更多</router-link></div>
		</div>
	</div>
</template>
<script>
	import vBanner from './banner.vue'; 
	const commonSortData = [{picUrl: 'images/flowers/baihe.png'},{picUrl: 'images/flowers/carnation.png'},{picUrl: 'images/flowers/baihe.png'},{picUrl: 'images/flowers/carnation.png'},{picUrl: 'images/flowers/baihe.png'}];

	export default{
		name: 'v-home',
		components: {
			vBanner
		},
		data(){
			return {
				commonSortList: commonSortData,
				blogCategory: 'all',
				picType: 'latest',
				blogPage: 1,
				picPage: 1,
				blogPageSize: 3,
				picPageSize: 6,
				blogListData: [],
				picListData: []
			}
		},
		computed: {
			favouListConvert(){
				var data = this.blogListData;
				for(let i=0,len=data.length;i<len;i++){
					var favouClassObj = {
						outerClass: {
							'favou-one': false,
							'favou-two': false,
							'favou-three': false
						},
						imgClass: {
							'favou-one-l': false,
							'favou-top': false
						},
						textClass: {
							'favou-one-r': false,
							'favou-bottom': false
						}
					};
					if(i == 0){
						favouClassObj.outerClass['favou-one'] = true;
						favouClassObj.imgClass['favou-one-l'] = true;
						favouClassObj.textClass['favou-one-r'] = true;
					}else{
						favouClassObj.imgClass['favou-top'] = true;
						favouClassObj.textClass['favou-bottom'] = true;
						if(i == 1){
							favouClassObj.outerClass['favou-two'] = true;
						}else{
							favouClassObj.outerClass['favou-three'] = true;
						}
					}
					data[i].favouClassObj = favouClassObj;
				}
				return data;
			},
			picproListConvert(){
				var data = this.picListData;
				var result = [];
				for(let i=0,len=data.length;i<len;i+=3){
					result.push(data.slice(i,i+3))
				}
				return result;
			}
		},
		created(){
			document.body.style.overflow = 'auto';
			document.body.style.backgroundColor = '#f7f7f7'
		},
		mounted(){
			this.renderHomeBlogs();
			this.renderHomePics();
		},
		methods: {
			renderHomeBlogs(){
				let vm = this;
				vm.$http.get('/data/blog/getBlog?category='+vm.blogCategory+'&page='+vm.blogPage+'&pageSize='+vm.blogPageSize).then(response=>{
					if(response.body.length > 0){
						response.body.forEach(function(val,i){
							vm.blogListData.push(val);
						})
					}
				})
			},
			renderHomePics(){
				let vm = this;
				vm.$http.get('/data/pic/getPic/'+vm.picType+'/'+vm.picPage+'/'+vm.picPageSize).then(response=>{
					if(response.body.length > 0){
						response.body.forEach(function(val,i){
							vm.picListData.push(val);
						})
					}
				})
			}
		}
	}
</script>
<style scoped>
	.main{margin: 0 auto;width: 1200px;}
	.line{position: relative;color: #999;font-size: 16px;text-align: center;padding: 40px 0;}
	.line span:before{position: absolute;top: 48px;left: 0;display: inline-block;width: 44%;content: '';border-top: 1px solid #ededed;}
	.line span:after{position: absolute;top: 48px;right: 0;display: inline-block;width: 44%;content: '';border-top: 1px solid #ededed;}
	.common-sort-ul li{float: left;width: 240px;text-align: center;color: #333;font-size: 16px;}
	.common-sort-ul li img{width: 200px;margin-bottom: 15px;}
	
	.link-info{display: block;}
	.favou-one{height: 500px;overflow: hidden;}
	.favou-one-l{float: left;width: 50%;}
	.favourite img{width: 100%;height: 500px;object-fit: cover;}
	.favou-one-r{position: relative;float: left;box-sizing: border-box;width: 50%;height: 500px;padding: 20px;background: #fff;}
	.favourite h3{font-size: 24px;color: #333;}
	.article{font-size: 14px;color: #333;margin-top: 30px;}
	.article-data{position: absolute;bottom: 30px;font-size: 14px;color: #666;}
	.author{padding-right: 15px;}

	.favou-top{height:340px;overflow: hidden;}
	.favou-two{float: left;margin-top: 25px;width: 60%;margin-right: 2%;}
	.favou-bottom{position: relative;height: 200px;padding: 20px;background: #fff;}

	.favou-three{float: left;margin-top: 25px;width: 38%;}

	.picpro-imgbox,.picpro-rembox{float: left;}
	.rem-infobox{width: 208px;padding: 5px 16px;background: #fff;}
	.rem-infobox-l,.rem-infobox-r{height: 108px;}
	#picpro h3{display: inline-block;color: #ededed;font-size: 30px;border-bottom: 1px solid #ededed;}
	#picpro .rem-infobox-l h3,#picpro .rem-infobox-all h3{padding-right: 30px;}
	#picpro .rem-infobox-r h3{padding-left: 30px;}
	.picpro-t{font-size: 20px;padding: 6px 0;color: #222;}
	.picpro-row img{object-fit: cover;}

	.rem-infobox-r{text-align: right;margin-top: 4px;}
	.pic-author-w{margin-top: 12px;color: #999;}
	.pic-author-w span{color: #9e7e6b;padding-left: 5px;}
	.rem-infobox-all{height: 260px;}

	.all-b{text-align: right;}
	.all-b .rem-data{padding-top: 142px;}

	.more-picbox{position: relative;margin: 30px 0;text-align: center;}
	.more-btn{display: inline-block;width: 49%;font-size: 16px;color: #999;background: #fff;padding: 10px;}
	.more-btn:before{position: absolute;top: 19px;left: 0;display: inline-block;width: 22%;content: '';border-top: 1px solid #ededed;}
	.more-btn:after{position: absolute;top: 19px;right: 0;display: inline-block;width: 22%;content: '';border-top: 1px solid #ededed;}

</style>