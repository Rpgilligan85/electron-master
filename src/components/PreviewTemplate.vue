<template>
	<v-content>
		<webview class="webView" src="file:///public/preview/index.html"></webview>
	</v-content>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import AddProject from "./AddProject";

	export default {
		name: "Preview",
		components: {
			AddProject
		},
		props: ["template"],
		data: () => ({}),
		computed: {
			...mapState({
				userData: state => state.userData.userData
			})
		},
		methods: {
			...mapActions({
				loadTemplate: "userData/loadTemplate"
			})
		},
		beforeMount() {
			console.log("template", this.template);
			this.loadTemplate(this.template);
		}
	};
</script>
<style lang="scss">
	.webView {
		width: 100vw;
		height: calc(100vh - 75px);
	}
</style>
