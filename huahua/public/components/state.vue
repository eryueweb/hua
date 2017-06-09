<template>
	<div class="container">
		<div class="profile">
			<div class="profile-img">
				<img :src="profileBgData.bgPic" />
			</div>
			<div class="profile-info">
				<a href="javascript:" class="head-w"><img :src="profileInfoData.headerImg" /></a>
				<p class="name-w"><a href="javascript:" class="name">{{profileInfoData.hostName}}</a></p>
				<p class="basic-info">
					<span class="map"><i class="fa fa-map-marker"></i>{{profileInfoData.address}}</span>
				</p>
			</div>
			<div calss="profile-bottom"></div>
		</div>
		<div class="main">
			<div class="user-broadcast">
				<ul class="user-broadcast-ul">
					<li class="broadcast-li" v-for="broadcastItem in broadcastList">
						<p class="username-w"><a href="javascript:">{{broadcastItem.name}}</a></p>
						<div class="user-con">
							<p>{{broadcastItem.broadcast}}</p>
						</div>
						<div class="user-b clearfix">
							<p class="user-bl">
								<span>{{broadcastItem.date}}</span>
							</p>
							<ul class="viewers-ul clearfix">
								<li><a href="javascript:"><i class="fa fa-thumbs-o-up"></i></a></li>
								<li><a href="javascript:">评论</a></li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="side">
		</div>
	</div>
</template>
<script>
	const profileBgData = {bgPic: 'images/sun.jpg'};
	const profileInfoData = {headerImg: 'images/qianxun.jpg',hostName: 'Febraury',address: '北京西城'};
	const broadcastListData = {page: 1,list: [{name: 'Febraury',broadcast: '不成功，便成仁！',date: '2017年1月1日 18:00:00',praiseNum: '10'}]};
	export default{
		name: 'v-state',
		data(){
			return {
				profileBgData: profileBgData,
				profileInfoData: profileInfoData,
				broadcastListData: broadcastListData
			}
		},
		created(){
			document.body.style.backgroundColor = '#73CFF1'
		},
		computed: {
			broadcastList(){
				return this.broadcastListData.list
			}
		}
	}
</script>
<style scoped>
	.container{position: relative;left: 50%;margin-left: -480px;padding-top: 48px;width: 960px;background-color: #fff;}
	.profile{position: relative;border-bottom: 1px solid #e4e4e4;padding-bottom: 67px;background: #f8f8f8;}
	.profile-img{height: 200px;overflow: hidden;}
	.profile-img img{width: 100%;}
	.profile-info{position: absolute;bottom: 18px;left: 36px;width: 100%;}
	.head-w{float: left;}
	.head-w img{width: 140px;height: 140px;border-radius: 5px;}
	.search-broadcast{position: absolute;top: 6px;right: 10px;}
	.fa-search{color: #f7f7f7;}
	.name-w{position: relative;left: 12px;margin-top: 58px;}
	.name{color: #fff;font-size: 24px;}
	.fa-female{color: pink;}
	.basic-info{position: relative;left: 12px;margin-top: 14px;}
	.map{margin-left: 12px;color: #333;}
	.fa-map-marker{margin-right: 5px;color: #b5b5b5;}
	.change-coverbg{position: absolute;right: 0;bottom: 67px;display: inline-block;width: 28px;height: 28px;border-radius: 24px 0 0 0;background: rgba(0,0,0,.5);}
	.fa-cog{position: relative;top: 7px;left: 10px;color: #fff;}

	.main{margin-top: 20px;padding: 0 15px;border-right: 1px solid #e4e4e4;width: 580px;}
	.user-nav{border: 1px solid #d0d0d0;border-bottom-width: 2px;height:30px;background: #fafafa;}
	.user-nav-ul li{float: left;color: #666;font-size: 12px;text-align: center;}
	.user-nav-ul li a{display: block;line-height: 30px;}
	.user-nav-ul li a.current{border-bottom: 2px solid #229bd7;}
	.user-nav-ul li a span{padding: 0 10px;}
	.user-nav-ul li.allLi a span{border-right: 1px solid #d5d5d5;}

	.broadcast-li{padding: 20px 0;border-bottom: 1px dotted #e4e4e4;}
	.username-w{font-weight: 800;color: #006a92;}
	.user-con{margin-top: 10px;}
	.user-b{margin-top: 15px;}
	.user-bl{float: left;}
	.viewers-ul{float: right;}
	.viewers-ul{width: 80px;}
	.viewers-ul li{width: 40px;float: left;text-align: center;}
</style>