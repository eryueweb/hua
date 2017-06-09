<template>
	<div class="app-wraper" v-show="isShow">
		<v-header></v-header>
		<router-view></router-view>
	</div>
</template>
<script>
	import vHeader from './components/header.vue';
	export default{
		name: 'app',
		data(){
			return {
				isShow: true
			}
		},
		components: {
			vHeader
		},
		mounted(){
			if(window.navigator.userAgent.indexOf("Chrome") == -1 ){
				this.isShow = false;
				alert('请切换至Chrome浏览器哦^_^')
			}
		}
	}
</script>