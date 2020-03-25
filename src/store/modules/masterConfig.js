import Vue from "vue";
import _ from "lodash";

const electron = require("electron");
const path = require("path");
const fs = require("fs");

const state = {
	masterConfig: {}
};

const mutations = {
	SET_MASTER_CONFIG: (state, obj) => {
		state.masterConfig = obj;
	}
};

const actions = {
	saveConfig({ commit, state }, obj) {
		console.log("obj", obj);
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		const configPath = `${userPath}/configs/${obj.fileName}.js`;
		console.log("config", configPath);
		fs.writeFileSync(configPath, `const config = ${JSON.stringify(obj.data)}`);
		fs.writeFileSync(`./public/configs/${obj.fileName}.json`, JSON.stringify(obj.data));
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
