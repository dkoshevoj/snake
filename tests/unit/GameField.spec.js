import { mount } from '@vue/test-utils';
import GameField from '@/components/GameField.vue';
import FieldBlock from '@/components/FieldBlock.vue';
import { BLOCK_SIZE } from '@/store/constants';
import store from '@/store';
// import { createStore } from 'vuex';

describe('GameField', () => {
	let wrapper;
	// let store;

	beforeEach(() => {
		// store = createStore({
		// 	modules: {
		// 		field: {
		// 			namespaced: true,
		// 			state: {
		// 				fieldWidth,
		// 				blocksCollection: [],
		// 			},
		// 			getters: {
		// 				fieldWidth: state => state.fieldWidth,
		// 				blocksCollection: state => state.blocksCollection,
		// 			},
		// 			actions: {
		// 				setCollection: jest.fn(),
		// 			},
		// 		},
		// 	},
		// });

		wrapper = mount(GameField, {
			global: {
				plugins: [store],
			},
			components: {
				FieldBlock,
			},
		});
	});

	it('renders the correct number of FieldBlock components', () => {
		const blocks = wrapper.findAllComponents(FieldBlock);
		expect(blocks.length).toBe(wrapper.vm.fieldWidth * wrapper.vm.fieldWidth);
	});

	it('renders the field blocks with correct sizes', () => {
		expect(wrapper.findAll('.excel').every(item => item.element.clientWidth === BLOCK_SIZE));
	});

	it('correctly sets data attributes for FieldBlock components', async () => {
		const blocks = wrapper.findAllComponents(FieldBlock);

		let index = 0;
		for (let y = 1; y <= wrapper.vm.fieldWidth; y++) {
			for (let x = 1; x <= wrapper.vm.fieldWidth; x++) {
				const block = blocks[index];
				expect(block.element.getAttribute('data-x')).toBe(x.toString());
				expect(block.element.getAttribute('data-y')).toBe(y.toString());
				index++;
			}
		}
	});

	it('dispatches the setCollection action with the correct parameters', () => {
		const setCollectionSpy = jest.spyOn(wrapper.vm, 'setCollection');
		wrapper.vm.init();
		expect(setCollectionSpy).toHaveBeenCalledWith(wrapper.vm.$refs.container);

		setCollectionSpy.mockRestore();
	});

	it('renders the container with the correct width and height', () => {
		const container = wrapper.find('.container');
		const expectedWidth = wrapper.vm.fieldWidth * BLOCK_SIZE;
		const expectedHeight = wrapper.vm.fieldWidth * BLOCK_SIZE;

		expect(container.attributes('style')).toContain(`width: ${expectedWidth}px`);
		expect(container.attributes('style')).toContain(`height: ${expectedHeight}px`);
	});
});
