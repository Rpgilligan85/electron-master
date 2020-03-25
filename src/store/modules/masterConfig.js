import Vue from "vue";
import _ from "lodash";

const state = {
	masterConfig: {}
};

const mutations = {
	SET_MASTER_CONFIG: (state, obj) => {
		Vue.set(state.masterConfig, obj.header, obj.data);
		console.log("state", state);
	}
};

const actions = {
	saveConfig({ commit, state }, obj) {
		console.log("obj", obj);
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		const configPath = `${userPath}/configs/${obj.fileName}.json`;
		console.log("config", configPath);
		fs.writeFileSync(configPath, JSON.stringify(obj.data));
		fs.writeFileSync(`./public/configs/${obj.fileName}.json`, JSON.stringify(obj.data));
	}
};

export default {
	namespaced: true,
	state,
	mutations
};
