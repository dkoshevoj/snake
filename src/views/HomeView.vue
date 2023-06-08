<template>
	<div class="main">
		<header class="header">
			<div class="logo">
				<img src="../assets/images/snake.png" alt="logo" />
			</div>
			<h1 class="title">Fat Snake 2</h1>
		</header>
		<div class="control">
			<div class="control__select">
				<label for="select">Select size</label>
				<custom-select
					:options="selectOptions"
					:selected="selectedOption"
					:changeHandler="setSelectedOption"
					color="yellow"
					id="select"
					class="control__select-select"
				/>
				<input-range
					min="1"
					max="5"
					step="1"
					title="speed"
					:changeHandler="changeSpeed"
					:value="speed"
				/>
			</div>
			<custom-button :handleClick="startGame" id="start-game">Start</custom-button>
		</div>
	</div>
</template>

<script>
import CustomSelect from '@/components/shared/CustomSelect';
import CustomButton from '@/components/shared/CustomButton';
import InputRange from '@/components/shared/InputRange';

import { mapActions } from 'vuex';

export default {
	components: { CustomSelect, CustomButton, InputRange },
	data() {
		return {
			selectOptions: [
				{ value: 15, name: '15 cells' },
				{ value: 20, name: '20 cells' },
			],
			selectedOption: { value: 15, name: '15 cells' },
			speed: 3,
		};
	},
	name: 'HomeView',

	methods: {
		...mapActions({
			setFieldWidth: 'field/setFieldWidth',
			setVelocity: 'field/setVelocity',
		}),
		setSelectedOption(selectedOption) {
			this.selectedOption = selectedOption;
		},

		startGame() {
			this.setVelocity(this.speed);
			this.setFieldWidth(this.selectedOption.value);
			this.$router.push({ path: '/game' });
		},

		changeSpeed(value) {
			this.speed = value;
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
			margin-bottom: 30px;

			&-select {
				margin-bottom: 20px;
			}

			& label {
				display: block;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
