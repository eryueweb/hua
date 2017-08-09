// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './app.vue';
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
