'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Velocity from 'velocity-animate';
import App from './app.vue';
import routers from './router.js';
// 注册路由插件；
Vue.use(VueRouter);
Vue.use(VueResource);

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