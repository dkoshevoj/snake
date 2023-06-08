import { shallowMount } from '@vue/test-utils';
import FieldBlock from '@/components/FieldBlock.vue';

describe('FieldBlock.vue', () => {
	it('renders the FieldBlock component', () => {
		const wrapper = shallowMount(FieldBlock);
		expect(wrapper.exists()).toBe(true);
	});
});
