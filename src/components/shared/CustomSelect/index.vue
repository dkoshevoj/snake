<template>
	<div>
		<span v-if="label" class="select-label">{{ label }}</span>
		<div
			class="custom-select"
			:class="{
				select_yellow: color === 'yellow',
				select_white: color === 'white',
				disabled,
			}"
		>
			<p @click="toggleSelect" class="title">
				{{ selected.name }}
			</p>
			<p class="arrow" :class="{ opened: optionsVisible }"></p>
			<ul v-if="optionsVisible" class="options" :style="listHeight">
				<li class="option-item" v-for="option in options" :key="option.value" @click="selectOption(option)">
					{{ option.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomSelect',
	data() {
		return {
			optionsVisible: false,
		};
	},
	props: {
		options: {
			type: Array,
			default: () => [],
			require: true,
		},
		selected: {
			type: Object,
			default: () => ({ name: '', value: '' }),
		},
		color: {
			type: String,
			default: () => 'dark',
		},
		label: {
			type: String,
		},
		changeHandler: {
			type: Function,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		height: {
			type: [Number, String, Boolean],
			default: () => false,
		},
	},

	computed: {
		listHeight() {
			return this.height ? `max-height: ${this.height}px` : '';
		},
	},

	methods: {
		toggleSelect() {
			if (!this.disabled) {
				this.optionsVisible = !this.optionsVisible;
			}
		},

		selectOption(option) {
			this.changeHandler(option);
			this.hideSelect();
		},

		hideSelect() {
			this.optionsVisible = false;
		},
	},

	mounted() {
		document.addEventListener('click', this.hideSelect.bind(this), true);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.hideSelect);
	},
};
</script>

<style scope lang="scss" src="./index.scss"></style>
