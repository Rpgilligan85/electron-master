<template>
	<v-app v-if="userData">
		<AppHeader />
		<router-view></router-view>
	</v-app>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppHome from './components/AppHome'
import { mapActions, mapState } from 'vuex'
export default {
	name: "App",
	components: {
		AppHeader,
		AppHome,
	},
	data: () => ({}),
	computed: mapState({
		userData: state => state.userData.userData
	}),
	methods: {
		...mapActions({
			loadUserData: 'userData/loadUserData'
		})	
	},
	created() {
		this.loadUserData()
	}
};
</script>
