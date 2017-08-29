import Vue from 'vue';
import * as types from '../mutation-types';

const state = {
	isHeartList: [],  
	picData: [],
	checkedPicId: NaN,
	checkedPicType: ''
}

const getters = {}

const mutations = {
	[types.CHANGE_HEART_FLAG](state,payload){
		state.isHeartList[payload.index] = true
	},
	[types.GET_ISHEART_LIST](state,payload){
		state.isHeartList[payload.index] = false;
	},
	[types.GET_PICDATA_LIST](state,payload){
		state.picData.push(payload.val)
	},
	[types.CHECKED_PIC_INFO](state,payload){
		state.checkedPicId = payload.id;
		state.checkedPicType = payload.type
	}
}

const actions = {}

export default{
	state,
	getters,
	mutations,
	actions
}