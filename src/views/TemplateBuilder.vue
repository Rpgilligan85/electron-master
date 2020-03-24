<template>
	<v-content>
		<v-container fluid>
			<TemplateSetup :template="template" />
		</v-container>
	</v-content>
</template>

<script>
	import TemplateSetup from "../components/TemplateSetup";

	export default {
		components: {
			TemplateSetup
		},
		props: ["template"],
		name: "ComplexViewer",
		data: () => ({})
	};
</script>
