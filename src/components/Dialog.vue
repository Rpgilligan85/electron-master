<template>
	<v-dialog
		v-model="dialogObj.visible"
		@click:outside="closeDialog()"
		:width="dialogObj.width ? dialogObj.width : '500px'"
	>
		<IconPicker />
	</v-dialog>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import IconPicker from "./IconPicker";

	export default {
		name: "Dialog",
		components: {
			IconPicker
		},
		data: () => ({
			dialogComponent: null
		}),
		computed: {
			...mapState({
				dialogObj: state => state.dialog.dialogObj
			})
		},
		methods: {
			...mapMutations({
				SET_DIALOG_OBJ: "dialog/SET_DIALOG_OBJ"
			}),
			closeDialog() {
				this.SET_DIALOG_OBJ({ visible: false });
			}
		}
	};
</script>
