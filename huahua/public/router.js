'use strict';
import Header from './components/header.vue';
import Home from './components/home.vue';
import State from './components/state.vue';
import Pic from './components/pic.vue';
import Blog from './components/blogList.vue';
import BlogDetail from './components/blogDetail.vue';
const routers = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/state',
		name: 'state',
		component: State
	},
	{
		path: '/pic',
		name: 'pic',
		component: Pic
	},
	{
		path: '/pic/:type/:id',
		name: 'picView',
		component: Pic
	},
	{
		path: '/blog',
		name: 'blog',
		component: Blog
	},
	{
		path: '/blogDetail/:id',
		name: 'blogDetail',
		component: BlogDetail
	}

];
export default routers;