import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import state from './state'
// import login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	// modules: {
	// 	login
	// }
})