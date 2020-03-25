<template>
	<div>
		<v-row>
			<h1 class="header-setup ml-3 pb-2">{{ template }} Setup</h1>
			<v-spacer />
			<v-col cols="2">
				<v-file-input
					v-model="file"
					@change="setData()"
					dark
					dense
					solo
					label="Upload Config"
				></v-file-input>
			</v-col>
		</v-row>
		<v-row>
			<v-expansion-panels dark tile flat accordion>
				<v-expansion-panel v-for="(item, i) in templates[template].panels" :key="i">
					<v-expansion-panel-header color="#121212" class="">{{
						item
					}}</v-expansion-panel-header>
					<v-expansion-panel-content>
						<component
							:is="templates[template].components[i]"
							@update-conifg="getDetails"
						/>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>
	</div>
</template>

<script>
	import Details from "./Details";
	import Data from "./Data";
	import _ from "lodash";

	import { mapState, mapGetters, mapMutations } from "vuex";
	export default {
		name: "TemplateSetup",
		props: ["template"],
		components: {
			Details,
			Data
		},
		data: () => ({
			file: null,
			masterConfig: {},
			templates: {
				ComplexViewer: {
					panels: ["Details", "Data"],
					components: ["Details", "Data"]
				}
			}
		}),
		methods: {
			...mapMutations({
				SET_TEMPLATE_OBJ: "userData/SET_TEMPLATE_OBJ",
				SET_TEMPLATE_LOADED: "userData/SET_TEMPLATE_LOADED",
				SET_MASTER_CONFIG: "masterConfig/SET_MASTER_CONFIG"
			}),
			setData() {
				console.log("files", this.file);
				const reader = new FileReader();
				reader.onload = e => {
					this.SET_TEMPLATE_OBJ(JSON.parse(e.target.result));
					this.SET_TEMPLATE_LOADED(true);
				};
				reader.readAsText(this.file);
			},
			getDetails(key, val) {
				const config = _.set(this.masterConfig, key, val);
				console.log("config", config);
			}
		},
		mounted() {
			// console.log("template", this.templates);
		}
	};
</script>
<style lang="scss">
	.header-setup {
		color: #fff;
	}
</style>
