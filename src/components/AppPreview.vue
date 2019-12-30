<template>
	<webview class="webView" src="file:///public/preview/index.html"></webview>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddProject from './AddProject'

export default {
	name: 'AppHome',
	components: {
		AddProject
	},
	props:['index'],
	data: () => ({
	}),
	computed: {
		...mapState({
			userData: state => state.userData.userData
		}),
	},
	methods: {
		getImage() {
			return this.userData[this.index].image ? this.userData[this.index].image : '/images/defaultImage.png'
		},
		...mapActions({
			loadConfig: 'userData/loadConfig'
		})
	},
	beforeMount() {
		console.log('index',this.index)
		this.loadConfig(this.index)
	},
	
};
</script>
<style lang="scss">

	.webView {
		width: 100vw;
		height: calc(100vh - 75px);
	}

</style>