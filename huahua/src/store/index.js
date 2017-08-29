import Vue from 'vue';
import Vuex from 'vuex';
import picModule from '@/store/modules/picModule';
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		picModule
	}
})
