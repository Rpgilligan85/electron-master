import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import VueRouter from "vue-router";
import router from "./router/index";
Vue.use(VueRouter);

import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
	store,
	vuetify,
	router,
	render: h => h(App)
}).$mount("#app");
