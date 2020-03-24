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
					:items="Object.keys(csvData[0])"
					label="Latitude"
				/>
			</v-col>
			<v-col>
				<v-select
					v-if="csvData"
					v-model="long"
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
					:items="Object.keys(csvData[0])"
					label="Group Property"
				/>
			</v-col>
			<v-col>
				<v-select
					v-if="csvData"
					v-model="supProp"
					:items="Object.keys(csvData[0])"
					label="Sup  Group Property (optional)"
				/>
			</v-col>
		</v-row>
		<template v-if="icons">
			<v-row v-for="(item, key) in icons" :key="key">
				<v-col cols="2">
					{{ item.value }}
				</v-col>
				<v-col cols="1">
					<v-text-field v-model="icons[item.value].icon" label="icon" />
				</v-col>
				<v-col cols="1">
					<v-text-field v-model="icons[item.value].color" label="color" />
				</v-col>
				<v-col cols="1">
					<v-text-field v-model="icons[item.value].size" label="size" />
				</v-col>
				<v-col v-if="icons[item.value].icon">
					<v-icon>{{ icons[item.value].icon }}</v-icon>
				</v-col>
			</v-row>
		</template>
		<v-row justify="center">
			<v-btn @click="saveData()" color="green">Save</v-btn>
		</v-row>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import _ from "lodash";
	const d3 = require("d3");
	export default {
		name: "Data",

		data: () => ({
			uploadData: null,
			id: null,
			csvData: null,
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
			...mapActions({
				saveTemplate: "userData/saveTemplate"
			}),
			...mapMutations({
				SET_TEMPLATE: "userData/SET_TEMPLATE",
				SET_DIALOG_OBJ: "dialog/SET_DIALOG_OBJ"
			}),
			openIcons() {
				this.SET_DIALOG_OBJ({
					component: "Dialog",
					visible: true
				});
			},
			saveData() {
				this.SET_TEMPLATE({
					header: "data",
					data: {
						[this.id]: {
							id: this.id,
							dataInput: "csv",
							options: {
								dataOutput: "geojson",
								url: this.url,
								lat: this.lat,
								lng: this.long
							},
							style: {
								prop: this.prop,
								subProp: this.supProp,
								styleObj: null
							}
						}
					}
				});
				console.log("template", this.template);
				this.saveTemplate({
					fileName: this.id,
					data: this.template
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
					console.log("CSV Data", this.csvData);
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
								this.icons = {};
								Object.keys(icons).forEach(item => {
									this.icons[item] = {
										value: item,
										color: null,
										icon: null,
										size: null
									};
								});
								this.csvData = csv;
							});
							this.id = this.template.data[item].id;
							this.url = this.template.data[item].options.url;
							this.lat = this.template.data[item].options.lat;
							this.long = this.template.data[item].options.lng;
							this.prop = this.template.data[item].style.prop;
							this.supProp = this.template.data[item].style.subProp;
						});
					}
				},
				immediate: true
			},
			prop: {
				handler(val) {
					// if (!this.templateLoaded) {
					let icons = _.groupBy(this.csvData, x => x[val]);
					this.icons = {};
					Object.keys(icons).forEach(item => {
						this.icons[item] = {
							value: item,
							color: null,
							icon: null,
							size: null
						};
					});
					// }
				},
				immediate: true
			},
			icons: {
				handler(val) {
					console.log("icons", val);
				},
				deep: true,
				immediate: true
			}
		}
	};
</script>
