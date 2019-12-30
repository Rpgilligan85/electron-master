const state = {
	localProjects: [],
}

const getters = {}

const mutations = {
	
}

const actions = {
	addProject({commit, state}, form) {
		commit('userData/ADD_PROJECT', form, {root: true})
	},
	removeProject({commit, state}, index) {
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