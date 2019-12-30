<template>
<div>
	<v-dialog
      v-model="dialog"
      width="500"
	  persistent
    >
		<v-card>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols>
                			<v-text-field label="Project Name*" required v-model="projectName"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" @click="dialog = false">Close</v-btn>
				<v-btn color="green darken-1" @click="createProject()">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-row class="pr-3 mt-5" justify="end">
		<v-btn @click="dialog = true" color="green">Add Project</v-btn>
	</v-row>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'Page2',
	data: () => ({
		dialog: false,
		projectName: null
	}),
	methods: {
		...mapActions({
			addProject: 'projects/addProject'
		}),
		createProject() {
			this.dialog = false
			this.addProject({projectName:this.projectName})
			this.projectName = null
		}
	}
};
</script>
