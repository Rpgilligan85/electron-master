<template>
	<v-content>
		<v-container>
			<ChooseTemplate />
			<!-- <RecentProjects /> -->
		</v-container>
	</v-content>
</template>

<script>
	import ChooseTemplate from "../components/ChooseTemplate";
	import RecentProjects from "../components/RecentProjects";

	export default {
		components: {
			ChooseTemplate,
			RecentProjects
		},
		name: "Home",
		data: () => ({})
	};
</script>
