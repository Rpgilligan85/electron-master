<template>
	<v-toolbar color="blue" max-height="75px" height="75px">
		<v-toolbar-title>My Awesome Electron App</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn to="/" text>Home</v-btn>
			<v-btn @click="saveData()" depressed color="green">Save</v-btn>
      </v-toolbar-items>
	</v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'AppHeader',
	data: () => ({
	}),
	methods: {
		...mapActions({
			saveData: 'userData/saveUserData'
		})
	}
};
</script>
