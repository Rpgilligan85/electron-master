const electron = require("electron");
const path = require("path");
const fs = require("fs");

const state = {
	userData: [],
	config: null,
	templateLoaded: false
};

const getters = {};

const mutations = {
	SET_USER_DATA(state, data) {
		state.userData = data;
	},
	ADD_PROJECT(state, obj) {
		state.userData.unshift(obj);
	},
	REMOVE_PROJECT(state, index) {
		state.userData.splice(index, 1);
	},
	SET_CONFIG(state, obj) {
		state.config = obj;
	},
	SET_TEMPLATE(state, obj) {
		state.template[obj.header] = obj.data;
	},
	SET_TEMPLATE_OBJ(state, obj) {
		state.template = obj;
	},
	SET_TEMPLATE_LOADED(state, bool) {
		state.templateLoaded = bool;
	}
};

const actions = {
	loadUserData({ commit, state }) {
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		console.log("userPath", userPath);
		const configPath = userPath + "/userData.json";
		try {
			const userData = JSON.parse(fs.readFileSync(configPath));
			commit("SET_USER_DATA", userData);
		} catch (error) {
			fs.writeFileSync(configPath, JSON.stringify({ name: "Ryan Gilligan" }));
			commit("SET_USER_DATA", { name: "Ryan Gilligan" });
		}
	},
	saveUserData({ commit, state }) {
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		const configPath = userPath + "/userData.json";
		fs.writeFileSync(configPath, JSON.stringify(state.userData));

		commit("projects/SET_UPDATE", true, { root: true });
	},
	loadConfig({ commit, state }, index) {
		console.log("state", state.userData[index]);
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		const templatePath = state.userData[index].template
			? `${userPath}/templates/${state.userData[index].template}`
			: `${userPath}/templates/default.js`;
		console.log(templatePath);
		const config = fs.readFileSync(templatePath);
		fs.writeFileSync("./public/preview/config.js", config);
	},
	loadTemplate({ commit, state }, template) {
		const userPath = (electron.app || electron.remote.app).getPath("userData");
		let templatePath;
		template === "master"
			? (templatePath = `${userPath}/configs/${template}.js`)
			: (templatePath = `${userPath}/templates/${template}.js`);
		const config = fs.readFileSync(templatePath);
		fs.writeFileSync("./public/preview/config.js", config);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
