<template>
	<v-container>
		<v-content>
			<h1 class="mb-3">Recent Projects</h1>
			<v-row>
				<v-col cols="4" v-for="(item,index) in userData" :key="index">
					<v-card>
						<v-container>
							<v-row>
								<v-card-title>{{ item.projectName }}</v-card-title>
								<v-spacer></v-spacer>
								<v-btn @click="removeProject(index)" class="mr-2" x-small fab depressed color="red darken-4">
									<v-icon color="white">mdi-close</v-icon></v-btn>
							</v-row>
						</v-container>
					</v-card>
				</v-col>
			</v-row>
			<AddProject />
		</v-content>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddProject from './AddProject'

export default {
	name: 'AppHome',
	components: {
		AddProject
	},
	data: () => ({
	}),
	computed: {
		...mapState({
			userData: state => state.userData.userData
		}),
	},
	methods: {
		...mapActions({
			removeProject: 'projects/removeProject'
		})
	}
};
</script>
