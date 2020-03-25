import Vue from "vue";
import Vuex from "vuex";
import userData from "./modules/userData";
import projects from "./modules/projects";
import dialog from "./modules/dialog";
import masterConfig from "./modules/masterConfig";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userData,
		projects,
		dialog,
		masterConfig
	},
	state: {
		selectedTemplate: null
	},
	getters: {
		selectedTemplate: state => state.selectedTemplate
	},
	mutations: {
		SET_SELECTED_TEMPLATE(state, str) {
			state.selectedTemplate = str;
		}
	}
});
