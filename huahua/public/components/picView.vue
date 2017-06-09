<template>
	<div class="pic-overlay-w" v-if="isClose">
		<div class="pic-overlay">
			<a href="javascript:" class="close-btn" @click="picView()"><i class="fa fa-close fa-5x"></i></a>
			<div class="pic-view">
				<div class="pic-view-w">
					<div class="main-part">
						<div class="pic-info" v-if="isPicinfo">
							<div class="tool-bar clearfix">
								<a href="javascript:" class="like-btn t" @click.once="toHeart()"><i class="fa fa-heart" :class="{noHeart:!picHeart,isHeart:picHeart}"></i></a>
								<a :href="picDataConvert.picUrl" target="_blank" class="plus-btn"><i class="fa fa-search-plus"></i></a>
							</div>
							<div class="main-img">
								<a href="javascript:" class="main-img-w">
									<img :src="picDataConvert.picUrl" />
								</a>
							</div>
							<div class="briefing">
								<p class="brief-con">{{picDataConvert.instruction}}</p>
							</div>
							<div class="tool-bar-bottom clearfix">
								<a href="javascript:" class="like-btn b" @click.once="toHeart()"><i class="fa fa-heart" :class="{noHeart:!picHeart,isHeart:picHeart}"></i>喜欢<span class="like-num"> {{picDataConvert.heartNum}}</span></a>
								<!--a href="javascript:" class="comment-btn"><i class="fa fa-comment b"></i>评论<span class="comment-num">10</span></a-->
								<p class="time-w">采于<span class="collect-time">{{picDataConvert.collectConvertDate}}</span></p>
							</div>
						</div>
						<!--div class="comment-info">
							<div class="comments">
								<div class="comemnt-item">
									<a href="javascript:" class="head"><img src="images/qianxun.jpg" /></a>
									<div class="meta">
										<a href="javascript:" class="author">千寻</a>-<span class="comment-time">31分钟前</span>说
									</div>
									<div class="text">1</div>
									<div class="action-btns">
										<a href="javascript:" title="删除"><i class="fa fa-trash"></i></a>
										<a href="javascript:" title="回复"><i class="fa fa-mail-reply"></i></a>
										<a href="javascript:" title="举报"><i class="fa fa-warning"></i></a>
									</div>
								</div>
								<div class="comemnt-item">
									<a href="javascript:" class="head"><img src="images/qianxun.jpg" /></a>
									<div class="meta">
										<a href="javascript:" class="author">千寻</a>-<span class="comment-time">31分钟前</span>说
									</div>
									<div class="text">1</div>
									<div class="action-btns">
										<a href="javascript:" title="删除"><i class="fa fa-trash"></i></a>
										<a href="javascript:" title="回复"><i class="fa fa-mail-reply"></i></a>
										<a href="javascript:" title="举报"><i class="fa fa-warning"></i></a>
									</div>
								</div>
								<div class="comemnt-item">
									<a href="javascript:" class="head"><img src="images/qianxun.jpg" /></a>
									<div class="meta">
										<a href="javascript:" class="author">千寻</a>-<span class="comment-time">31分钟前</span>说
									</div>
									<div class="text">1</div>
									<div class="action-btns">
										<a href="javascript:" title="删除"><i class="fa fa-trash"></i></a>
										<a href="javascript:" title="回复"><i class="fa fa-mail-reply"></i></a>
										<a href="javascript:" title="举报"><i class="fa fa-warning"></i></a>
									</div>
								</div>
							</div>
							<div class="comment-view">
								<a href="javascript:" class="head"><img src="images/qianxun.jpg" /></a>
								<div class="comment-con">
									<textarea name="comment-detail" id="comment-detail"></textarea>
								</div>
							</div>
							<div class="like-persons">
								<p class="like-data"><span class="number">2</span>喜欢</p>
								<div class="like-heads">
									<a href="javascript:"><img src="images/2.jpg" /></a>
									<a href="javascript:"><img src="images/3.jpg" /></a>
								</div>
							</div>
						</div-->
					</div>
					<div class="side-part">
						<div class="scrollbar">
							<div class="side-waterfall">
								<a href="javascript:" class="cell" v-for="(picItem,index) in sidePicListData" @click="picClick(picItem.type,picItem.id,index)">
									<img :src="picItem.picUrl" />
									<div class="cover" v-if="isCoverList[index]"></div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'pic-view',
		props: ['isClose','picType','picId','picHeart','activeType'],
		data(){
			return {
				picData: [],
				sidePicListData: [],
				isLoad: true,
				isCoverArr: [],
				picIndex: '',
				picIdData: this.picId,
				picTypeData: this.picType,
				isPicinfo: false,
				page: 1,
				pageSize: 30
			}
		},
		computed: {
			picDataConvert(){
				return this.picData[0]
			},
			isCoverList(){
				return this.isCoverArr
			}
		},
		created(){
			document.body.style.overflow = 'hidden';
		},
		mounted(){
			let vm = this;
			vm.renderView(vm.picType,vm.picId);
			vm.sidePicLoad();
		},
		methods: {
			renderView(type,id){
				let vm = this;
				vm.$http.get('/data/pic/getPicView/'+type+'/'+id).then(response=>{
					vm.picData = response.body;
					vm.isPicinfo = true
				});
			},
			picView(){
				this.$emit('close')
			},
			toHeart(){
				if(!(this.picHeart)){
					this.$emit('like');
					this.picData[0].heartNum += 1;
				}
			},
			sidePicLoad(){
				let vm = this;
				vm.$http.get('/data/pic/getPic/'+vm.activeType+'/'+vm.page+'/'+vm.pageSize).then(response=>{
					if(response.body.length > 0){
						response.body.forEach(function(val,i){
							vm.sidePicListData.push(val);
							if(val.id == vm.picId && val.type == vm.picType){
								vm.isCoverArr.push(false);
								vm.picIndex = i;
							}else{
								vm.isCoverArr.push(true)
							}
						});
						if(response.body.length < 10){
							vm.isLoad = false
						}
					}else{
						vm.isLoad = false
					}
				});
			},
			/*未生效？？start*/
			picHover(index){
				this.isCoverList[index] = false;
			},
			picLeave(index){
				this.isCoverList[index] = true;
			},
			/*未生效？？end*/
			picClick(type,id,index){
				let vm = this;
				vm.renderView(type,id);
				vm.isCoverList.forEach(function(val,i){
					vm.isCoverList[i] = true;
				});
				vm.isCoverList[index] = false;
			}
		}
	}
</script>
<style scoped>
	.pic-overlay-w{overflow: hidden;}
	.pic-overlay{position: fixed;top: 0;left: 0;z-index: 20000;box-sizing: content-box;padding-right: 17px;width: 100%;height: 100%;background: rgba(229,229
		,229,.95);overflow: auto;}
	.close-btn{position:fixed;top: 0px;right: 20px;}
	.fa-close{color: #666;}
	.pic-view-w{position:relative;margin: 0 auto;width: 1014px;}
	.main-part{float: left;position: absolute;width: 658px;}
	.pic-info{padding: 20px;width: 100%;background: #fff;}
	.main-img-w{display: inline-block;width: 658px;text-align: center;}
	.main-img img{max-width: 658px;}
	.like-btn.t,.plus-btn{display: inline-block;padding: 6px 8px;border: 1px solid rgba(0,0,0,.2);background: #fff;background: linear-gradient(#fafafa,#f2f2f2);-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;}
	.like-btn.t{float: left;}
	.plus-btn{float: right;}
	.main-img{margin-top: 12px;}
	.tool-bar-bottom{margin-top: 15px;}
	.tool-bar-bottom i{margin-right: 5px;}
	.comment-btn{margin-left: 10px;}
	.like-btn.b,.comment-btn{float: left;display: inline-block;background: #fafafa;border: 1px solid #ededed;padding: 5px 10px;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;font-size: 14px;color: #444;}
	.like-num,.comment-num{color: #999;}
	.isHeart{color: #f00;}
	.noHeart{color: #A6A6A6;}
	.fa-comment.b{color: #A6A6A6;}
	.briefing{margin-top: 10px;font-size: 14px;}
	.time-w{float: right;color: #999;line-height: 28px;}
	.brief-con{color: #444;word-wrap: break-word;}
	.collect-time{margin-left: 5px;margin-bottom: 20px;}

	.comment-info{margin-top: 20px;width: 698px;background: #fff;}
	.comments{border-top: 1px solid #f5f2f2;}
	.comemnt-item{position:relative;padding: 20px;border-bottom: 1px solid #f5f2f2;}
	.head{float: left;margin-right: 12px;}
	.head img,.like-heads img{width: 50px;height: 50px;}
	.meta{line-height: 20px;color: #999;}
	.author{color: #222;}
	.text{margin-top: 5px;line-height: 20px;}
	.action-btns{position: absolute;top: 20px;right: 10px;}
	.action-btns i{padding-right: 10px;color: #d8d8d8;}
	.comment-view{padding: 20px;}
	textarea#comment-detail{width: 566px;min-height: 38px;padding: 6px 10px;border: 1px solid #ccc;-webkit-box-shadow: inset 0 1px 5px rgba(0,0,0,.08);-moz-box-shadow: inset 0 1px 2px rgba(0,0,0,.05);box-shadow: inset 0 1px 2px rgba(0,0,0,.05);-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;}

	.like-persons{padding: 20px;border-top: 1px solid #f5f2f2;}
	.like-data{font-weight: bold;}
	.like-heads{margin-top: 10px;}
	.like-heads a{display: inline-block;margin-right: 5px;}

	/*side part*/
	.side-part{position: absolute;top: 0;right: 0;background: #fff;padding: 20px 3px 20px 20px;}
	.scrollbar{position: relative;width: 277px;height: 480px;overflow: auto;}

	.side-waterfall{position: relative;min-height: 480px;-webkit-column-width: 86px;-webkit-column-gap: 1px;}
	.cell{position: relative;display: inline-block;margin: 1px;width: 86px;background: #fff;}
	.cell img{width: 100%;}
	.cell .cover{position: absolute;z-index: 100;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,.3);}
</style>