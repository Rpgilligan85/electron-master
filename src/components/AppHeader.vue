<template>
	<v-toolbar color="light-blue darken-4" dark max-height="75px" height="75px">
		<v-toolbar-title>My Awesome Electron App</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn to="/" text>Home</v-btn>
			<v-btn class="ml-10" :disabled="noChanges" @click="saveData()" depressed color="green">Save</v-btn>
      </v-toolbar-items>
	</v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'AppHeader',
	data: () => ({
	}),
	computed: {
		...mapState({
			noChanges: state => state.projects.update
		})
	},
	methods: {
		...mapActions({
			saveData: 'userData/saveUserData'
		})
	},
};
</script>
