<template>
	<div class="form-main">
		<div class="form-content">
			<label for="speed-range">{{ title }}</label>
			<div class="form-value" id="speed-range">{{ value }}</div>
		</div>
		<input type="range" id="range" :value="value" :min="min" :max="max" :step="step" @input="setValue" />
	</div>
</template>

<script>
export default {
	name: 'InputRange',
	props: {
		min: {
			type: String,
		},
		max: {
			type: String,
		},
		step: {
			type: String,
		},
		title: {
			type: String,
		},
		changeHandler: {
			type: Function,
		},
		value: {
			type: [Number, String],
		},
	},

	methods: {
		setValue(event) {
			this.changeHandler(event.target.value);
		},
	},
};
</script>

<style scope lang="scss" src="./index.scss" />
