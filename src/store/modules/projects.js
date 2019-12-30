const state = {
	update: true
}

const getters = {}

const mutations = {
	SET_UPDATE(state, bool) {
		state.update = bool
	}
}

const actions = {
	addProject({commit, state}, form) {
		commit('SET_UPDATE', false)
		commit('userData/ADD_PROJECT', form, {root: true})
	},
	removeProject({commit, state}, index) {
		commit('SET_UPDATE', false)
		commit('userData/REMOVE_PROJECT', index, {root: true})
	},
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }