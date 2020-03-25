<template>
	<div>
		<v-row class="pt-3">
			<h3>Data</h3>
			<v-col>
				<v-file-input
					v-model="uploadData"
					@change="loadCsv()"
					multiple
					label="File input"
				/>
			</v-col>
			<v-col>
				<v-text-field v-model="id" label="ID" />
			</v-col>
			<v-col>
				<v-select
					v-if="csvData"
					v-model="lat"
					@input="update(`data[${id}].options.lat`, $event)"
					:items="Object.keys(csvData[0])"
					label="Latitude"
				/>
			</v-col>
			<v-col>
				<v-select
					v-if="csvData"
					v-model="long"
					@input="update(`data[${id}].options.lng`, $event)"
					:items="Object.keys(csvData[0])"
					label="Longitude"
				/>
			</v-col>
		</v-row>
		<v-divider />
		<v-row class="mt-5">
			<h3>Icons</h3>
			<v-col>
				<v-select
					v-if="csvData"
					v-model="prop"
					@input="update(`data[${id}].style.prop`, $event)"
					:items="Object.keys(csvData[0])"
					label="Group Property"
				/>
			</v-col>
			<!-- <v-col>
				<v-select
					v-if="csvData"
					v-model="supProp"
					@input="update(`data[${id}].style.subProp`, $event)"
					:items="Object.keys(csvData[0])"
					label="Sup  Group Property (optional)"
				/>
			</v-col> -->
		</v-row>
		<template v-if="icons">
			<v-row v-for="(item, index) in icons" :key="index">
				<v-col cols="2">
					{{ item.value }}
				</v-col>
				<v-col cols="1">
					<v-text-field
						@input="updateIcons(item.value, $event)"
						v-model="item.icon"
						label="icon"
					/>
				</v-col>
				<v-col cols="1">
					<v-text-field
						@input="updateIcons(item.value, $event)"
						v-model="item.color"
						label="color"
					/>
				</v-col>
				<v-col cols="1">
					<v-text-field
						@input="updateIcons(item.value, $event)"
						v-model="item.size"
						label="size"
					/>
				</v-col>
				<v-col v-if="item.icon">
					<v-icon :size="item.size" :color="item.color">{{ item.icon }}</v-icon>
				</v-col>
			</v-row>
		</template>
		<v-divider />
		<v-row class="mt-5">
			<h3>Map Options</h3>
			<v-col>
				<v-select
					@input="update(`${selectedTemplate}.data[${id}.markerOptions`, $event)"
					v-model="markerOptions"
					:items="['markerOptions']"
					label="Marker Options"
				/>
			</v-col>
			<v-col>
				<v-select
					@input="update(`${selectedTemplate}.data[${id}.clusterOptions`, $event)"
					v-model="clusterOptions"
					:items="['clusterOptions']"
					label="Cluster Options"
				/>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-btn @click="saveData()" color="green">Save</v-btn>
			<v-btn class="ml-5" :to="`/previewTemplate/master`" color="blue">Preview</v-btn>
		</v-row>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import _ from "lodash";
	const d3 = require("d3");
	export default {
		name: "Data",
		props: ["selectedTemplate"],
		data: () => ({
			uploadData: null,
			id: null,
			csvData: null,
			clusterOptions: "clusterOptions",
			markerOptions: "markerOptions",
			url: null,
			lat: null,
			long: null,
			prop: null,
			supProp: null,
			icons: null
		}),
		computed: {
			...mapState({
				template: state => state.userData.template,
				templateLoaded: state => state.userData.templateLoaded
			})
		},
		methods: {
			...mapMutations({
				SET_TEMPLATE: "userData/SET_TEMPLATE",
				SET_DIALOG_OBJ: "dialog/SET_DIALOG_OBJ"
			}),
			...mapActions({
				saveConfig: "masterConfig/saveConfig"
			}),
			update(key, val) {
				// this.addIDs()
				this.$emit("update-conifg", key, val);
			},
			updateIcons() {
				this.$emit("update-conifg", `data[${this.id}.style.styleObj`, this.icons);
			},
			openIcons() {
				this.SET_DIALOG_OBJ({
					component: "Dialog",
					visible: true
				});
			},
			setDefaults() {
				this.$emit("update-conifg", `data[${this.id}].id`, this.id);
				this.$emit("update-conifg", `data[${this.id}].dataInput`, "csv");
				this.$emit("update-conifg", `data[${this.id}].options.dataOutput`, "geojson");
				this.$emit("update-conifg", `data[${this.id}].options.url`, this.url);
				this.$emit("update-conifg", `layout`, ["Home", this.selectedTemplate]);
				this.$emit("update-conifg", `defaultView`, this.selectedTemplate);
				this.$emit(
					"update-conifg",
					`${this.selectedTemplate}.data[${this.id}].id`,
					this.id
				);
				this.$emit(
					"update-conifg",
					`${this.selectedTemplate}.data[${this.id}].clusterOptions`,
					this.clusterOptions
				);
				this.$emit(
					"update-conifg",
					`${this.selectedTemplate}.data[${this.id}].markerOptions`,
					this.markerOptions
				);
			},
			saveData() {
				this.setDefaults();

				this.$emit("save-config");
			},
			preview() {
				this.saveData();
				this.saveConfig({
					fileName: "master",
					data: this.masterConfig
				});
			},
			loadCsv() {
				const reader = new FileReader();
				const file = this.uploadData[0];
				this.url = file.name;
				reader.onload = e => {
					const data = e.target.result;
					let lines = data.split("\n");
					let result = [];
					let headers = lines[0].split(",");
					for (let i = 1; i < lines.length; i++) {
						let obj = {};
						let currentline = lines[i].split(",");
						for (let j = 0; j <= headers.length; j++) {
							obj[headers[j]] = currentline[j];
						}
						result.push(obj);
					}
					let final = JSON.stringify(result);
					this.csvData = JSON.parse(final);
					console.log("CSV ata", this.csvData);
				};
				reader.readAsText(file);
			}
		},
		watch: {
			templateLoaded: {
				handler(val) {
					if (val) {
						Object.keys(this.template.data).forEach(item => {
							d3.csv("./data/" + this.template.data[item].options.url).then(csv => {
								console.log("csv", csv);
								let icons = _.groupBy(
									csv,
									x => x[this.template.data[item].style.prop]
								);
								/* this.icons = [];
								Object.keys(icons).forEach(item => {
									this.icons.push({
										value: item,
										color: null,
										icon: null,
										size: null
									});
								}); */
								this.csvData = csv;
							});
							console.log("template", this.template.data[item].style.styleObj);
							this.id = this.template.data[item].id;
							this.url = this.template.data[item].options.url;
							this.lat = this.template.data[item].options.lat;
							this.long = this.template.data[item].options.lng;
							this.prop = this.template.data[item].style.prop;
							this.supProp = this.template.data[item].style.subProp;
							this.icons = this.template.data[item].style.styleObj;
							console.log("icons", this.icons);
						});
					}
				},
				immediate: true
			},
			prop: {
				handler(val) {
					if (!this.templateLoaded) {
						let icons = _.groupBy(this.csvData, x => x[val]);
						console.log("icons", icons);
						this.icons = [];
						Object.keys(icons).forEach(item => {
							this.icons.push({
								value: item,
								color: null,
								icon: null,
								size: null
							});
						});
					}
				},
				immediate: true
			},
			subProp: {
				handler(val) {
					let icons = _.groupBy(this.csvData, x => x[val]);
					this.icons = [];
					Object.keys(icons).forEach(item => {
						this.icons.push({
							value: item,
							color: null,
							icon: null,
							size: null
						});
					});
				}
			}
		}
	};
</script>
