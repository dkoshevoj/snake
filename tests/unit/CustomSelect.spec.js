import { shallowMount } from '@vue/test-utils';
import CustomSelect from '@/components/shared/CustomSelect';

describe('CustomSelect', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(CustomSelect, {
			props: {
				selected: { name: 'Option 1', value: '1' },
				options: [
					{ name: 'Option 1', value: '1' },
					{ name: 'Option 2', value: '2' },
					{ name: 'Option 3', value: '3' },
				],
				changeHandler: jest.fn(),
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('displays the selected value', () => {
		expect(wrapper.find('.title').text()).toBe(wrapper.vm.selected.name);
	});

	it('opens a list of options when clicking on a header', async () => {
		expect(wrapper.find('.options').exists()).toBe(false);
		await wrapper.find('.title').trigger('click');
		expect(wrapper.find('.options').isVisible()).toBe(true);
	});

	it('calls handler function when option is selected', async () => {
		await wrapper.find('.title').trigger('click');
		await wrapper.findAll('.option-item').at(1).trigger('click');

		expect(wrapper.vm.changeHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'Option 2',
				value: '2',
			})
		);
	});

	it('hides the list of options when checked', async () => {
		await wrapper.find('.title').trigger('click');
		await wrapper.findAll('.option-item').at(1).trigger('click');
		expect(wrapper.find('.options')).not.toBe();
	});

	it('does not open the list of options if the component is disabled', async () => {
		const wrapper = shallowMount(CustomSelect, {
			props: {
				options: [
					{ name: 'Option 1', value: '1' },
					{ name: 'Option 2', value: '2' },
					{ name: 'Option 3', value: '3' },
				],
				disabled: true,
			},
		});

		expect(wrapper.find('.options').exists()).toBe(false);
		await wrapper.find('.title').trigger('click');
		expect(wrapper.find('.options').exists()).toBe(false);
	});
});
