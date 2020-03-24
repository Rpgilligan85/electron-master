<template>
	<v-row>
		<v-col cols="12">
			<h1 class="mb-3 header-starter">Choose a starter template</h1>
		</v-col>
		<v-row>
			<v-col cols="4" v-for="(item, index) in templates" :key="index">
				<v-card dark>
					<!-- <v-img height="200px" :src="getImage(item)"></v-img> -->
					<v-card-title>{{ item }}</v-card-title>
					<v-card-actions class="mt-5">
						<v-spacer></v-spacer>
						<v-btn :to="`/previewTemplate/${item}`" dark color="light-blue darken-4"
							>Preview</v-btn
						>
						<v-btn :to="`/templateBuilder/${item}`" color="green">
							Choose Template
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-row>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import AddProject from "./AddProject";

	export default {
		name: "RecentProjects",
		components: {
			AddProject
		},
		data: () => ({
			templates: ["ComplexViewer", "SimpleViewer"]
		}),
		computed: {},
		methods: {
			...mapActions({
				removeProject: "projects/removeProject"
			})
		}
	};
</script>
<style lang="scss">
	.header-starter {
		color: #fff;
	}
</style>
