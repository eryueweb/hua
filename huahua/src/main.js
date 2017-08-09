

'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import routers from './router/index.js';
// 注册路由插件；
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false

const router = new VueRouter({
	routes: routers
});
// 创建根实例
new Vue({
	router,
	render(h){
		return h(App)
	}
}).$mount('#app');
