<template>
	<v-app id="app" v-if="userData" dark>
		<Dialog v-if="dialog" />
		<AppHeader />
		<router-view></router-view>
	</v-app>
</template>

<script>
	import AppHeader from "./components/AppHeader";
	import Dialog from "./components/Dialog";
	import { mapActions, mapState } from "vuex";
	export default {
		name: "App",
		components: {
			AppHeader,
			Dialog
		},
		data: () => ({}),
		computed: mapState({
			userData: state => state.userData.userData,
			dialog: state => state.dialog.dialogObj.visible
		}),
		methods: {
			...mapActions({
				loadUserData: "userData/loadUserData"
			})
		},
		created() {
			this.loadUserData();
		}
	};
</script>
<style lang="scss">
	#app {
		background: #121212;
	}
</style>
