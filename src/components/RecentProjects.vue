<template>
	<v-row>
		<h1 class="mb-3">Recent Projects</h1>
		<v-row>
			<v-col cols="4" v-for="(item, index) in userData" :key="index">
				<v-card>
					<v-img height="200px" :src="getImage(item)"></v-img>
					<v-card-title>{{ item.projectName }}</v-card-title>
					<v-card-actions class="mt-5">
						<v-spacer></v-spacer>
						<v-btn :to="`/previewProject/${index}`" dark color="light-blue darken-4"
							>Preview</v-btn
						>
						<v-btn dark @click="removeProject(index)" color="red">
							Remove
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<AddProject class="ml-6" />
		</v-row>
	</v-row>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import AddProject from "./AddProject";

	export default {
		name: "RecentProjects",
		components: {
			AddProject
		},
		data: () => ({}),
		computed: {
			...mapState({
				userData: state => state.userData.userData
			})
		},
		methods: {
			...mapActions({
				removeProject: "projects/removeProject"
			}),
			getImage(item) {
				return item.image ? item.image : "/images/defaultImage.png";
			}
		}
	};
</script>
