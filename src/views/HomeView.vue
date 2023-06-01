<template>
	<div class="main">
		<header class="header">
			<div class="logo">
				<img src="../assets/images/snake.png" alt="logo" />
			</div>
			<h1 class="title" style="font-width: 26px">Fat Snake 2</h1>
		</header>
		<div class="control">
			<div class="control__select">
				<label for="select">Select size</label>
				<custom-select
					:options="selectOptions"
					:selected="SelectedOption"
					:changeHandler="setSelectedOption"
					color="yellow"
					id="select"
				/>
			</div>
			<!-- <div class="control__range">
				<input type="range" name="speed" id="speed" value="3" min="1" max="5" />
			</div> -->
			<custom-button :handleClick="() => this.$router.push({ path: '/game' })">Start</custom-button>
		</div>
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
	margin-top: 100px;

	.header {
		margin-bottom: 30px;

		.logo {
			display: flex;
			justify-content: center;

			img {
				display: block;
				width: 200px;
				max-width: 100%;
			}
		}

		.title {
			font-size: 50px;
		}
	}

	.control {
		display: flex;
		flex-direction: column;
		align-items: center;

		&__select {
			width: 200px;
			margin-bottom: 20px;

			& label {
				display: block;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
