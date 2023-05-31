<template>
	<div class="main">
		<div class="section">
			<h1 class="title" style="font-width: 26px">Snake 2</h1>
		</div>
		<div class="section" style="width: 300px">
			<label for="select">Select size</label>
			<custom-select
				:options="selectOptions"
				:selected="SelectedOption"
				:changeHandler="setSelectedOption"
				color="yellow"
				id="select"
			/>
			<!-- <input type="range" name="speed" id="speed" value="3" min="1" max="5" /> -->
		</div>
		<custom-button :handleClick="() => this.$router.push({ path: '/game' })">Start</custom-button>
	</div>
</template>

<script>
import CustomSelect from '@/components/shared/CustomSelect';
import CustomButton from '@/components/shared/CustomButton';

import { mapActions } from 'vuex';

export default {
	components: { CustomSelect, CustomButton },
	data() {
		return {
			selectOptions: [
				{ value: 15, name: '15 cells' },
				{ value: 20, name: '20 cells' },
			],
			SelectedOption: { value: 15, name: '15 cells' },
		};
	},
	name: 'HomeView',

	methods: {
		...mapActions({
			setFieldWidth: 'field/setFieldWidth',
		}),
		setSelectedOption(selectedOption) {
			this.SelectedOption = selectedOption;
			this.setFieldWidth(selectedOption.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.main {
	text-align: center;

	.section {
		margin-bottom: 30px;

		.title {
			font-size: 50px;
		}
	}
}
</style>
