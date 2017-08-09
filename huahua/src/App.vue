<template>
  <div id="app" v-show="isShow">
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
			var userAgent = window.navigator.userAgent;
			var ieV = new RegExp("MSIE ([0-9]+\.[0-9]+)");
			ieV.test(userAgent);
			if(userAgent.indexOf("MSIE") != -1 && parseFloat(RegExp.$1)<11){
				this.isShow = false;
				alert('你的浏览器该更新了哦^_^')
			}
		}
	}
</script>

