<template>
	<div>
		<v-row>
			<v-col>
				<v-text-field
					@input="update('details.title', $event)"
					v-model="title"
					label="Title"
				/>
			</v-col>
			<v-col>
				<v-text-field
					@input="update('details.summary', $event)"
					v-model="summary"
					label="summary"
				/>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-btn color="green" @click="saveDetails()">Save</v-btn>
		</v-row>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		name: "Details",
		data: () => ({
			title: null,
			summary: null
		}),
		computed: {
			...mapState({
				template: state => state.userData.template,
				templateLoaded: state => state.userData.templateLoaded,
				masterConfig: state => state.masterConfig.masterConfig
			})
		},
		methods: {
			...mapMutations({
				SET_MASTER_CONFIG: "masterConfig/SET_MASTER_CONFIG"
			}),
			update(key, val) {
				this.$emit("update-conifg", key, val);
			},
			saveDetails() {
				/* this.SET_TEMPLATE({
					header: "details",
					data: {
						title: this.title,
						summary: this.summary
					}
				}); */
				console.log("check", this.template);
			}
		},
		watch: {
			templateLoaded: {
				handler(val) {
					if (val) {
						this.title = this.template.details.title;
						this.summary = this.template.details.summary;
					}
				},
				immediate: true
			},
			masterConfig: {
				handler(val) {
					console.log("val", val);
				},
				immediate: true,
				deep: true
			}
		}
	};
</script>
