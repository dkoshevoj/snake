<template>
	<div class="container" ref="container" :style="containerWidth">
		<field-block v-for="item in width" :key="item" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FieldBlock from './FieldBlock.vue';

export default {
	components: { FieldBlock },
	name: 'GameField',
	data() {
		return {
			blocksCollection: [],
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		...mapGetters({
			fieldWidth: 'field/fieldWidth',
			collectionData: 'field/blocksCollection',
		}),

		width() {
			return Math.pow(this.fieldWidth, 2);
		},

		containerWidth() {
			return `width: ${this.fieldWidth * 32}px;
              height: ${this.fieldWidth * 32}px`;
		},
	},
	methods: {
		...mapActions({
			setCollection: 'field/setCollection',
		}),

		init() {
			this.blocksCollection = this.$refs.container.children;
			let i = 0;
			for (let y = 1; y <= this.fieldWidth; y++) {
				for (let x = 1; x <= this.fieldWidth; x++) {
					this.blocksCollection[i].setAttribute('data-x', x);
					this.blocksCollection[i].setAttribute('data-y', y);
					i++;
				}
			}

			this.setCollection(this.$refs.container);
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/sass/var.sass';

.container {
	display: flex;
	flex-wrap: wrap;
	outline: 1px solid $black;

	.excel {
		width: 32px;
		height: 32px;
		border: 1px dotted $border-light;
		font-size: 24px;
		text-align: center;
	}
}
</style>
