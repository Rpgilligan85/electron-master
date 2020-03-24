import VueRouter from "vue-router";

import PreviewProject from "../components/PreviewProject";
import PreviewTemplate from "../components/PreviewTemplate";
import TemplateBuilder from "../views/TemplateBuilder";

import Home from "../views/Home";

export const routes = [
	{ path: "/", component: Home },
	{ path: "/previewProject/:index", component: PreviewProject, props: true },
	{ path: "/previewTemplate/:template", component: PreviewTemplate, props: true },
	{ path: "/templateBuilder/:template", component: TemplateBuilder, props: true }
];

export default new VueRouter({ routes });
