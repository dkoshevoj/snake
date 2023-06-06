<template>
	<div class="modal" @mousedown="handleClick">
		<div @mousedown.stop class="modal__inner">
			<div class="modal__close-btn" @click="handleClick"><img src="../../../assets/images/close.svg" alt="close" /></div>
			<h3>{{ title }}</h3>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'modalWindow',
	props: {
		title: {
			type: String,
			required: true,
		},
		handleClick: Function,
		keyEventListener: Function,
	},
	mounted() {
		window.addEventListener('keydown', this.keyEventListener);
	},
	beforeUnmount() {
		window.removeEventListener('keydown', this.keyEventListener);
	},
};
</script>

<style scope lang="scss" src="./index.scss"></style>
