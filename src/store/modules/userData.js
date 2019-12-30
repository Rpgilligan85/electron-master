const electron = require('electron')
const path = require('path')
const fs = require('fs')

const state = {
	userData: [],
}

const getters = {}

const mutations = {
	SET_USER_DATA(state, data) {
		state.userData = data
	},
	ADD_PROJECT(state,obj) {
		state.userData.unshift(obj)
	},
	REMOVE_PROJECT(state,index) {
		state.userData.splice(index,1)
	}
}

const actions = {
	loadUserData ({commit, state}) {
		const userPath = (electron.app || electron.remote.app).getPath('userData')
		const configPath = (userPath + '/userData.json');
		try {
			const userData = JSON.parse(fs.readFileSync(configPath));
			commit('SET_USER_DATA', userData)
		} catch(error) {
			fs.writeFileSync(configPath, JSON.stringify({name:'Ryan Gilligan'}));
			commit('SET_USER_DATA', {name:'Ryan Gilligan'})
		}
	},
	saveUserData ({commit, state}) {
		const userPath = (electron.app || electron.remote.app).getPath('userData')
		const configPath = (userPath + '/userData.json');
		fs.writeFileSync(configPath, JSON.stringify(state.userData));
	}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }