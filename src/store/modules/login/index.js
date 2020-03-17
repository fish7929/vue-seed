import mutations from './mutations'
import actions from './action'
import getters from './getters'
import state from './state'

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}