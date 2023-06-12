import { shallowMount } from '@vue/test-utils';
import CustomButton from '@/components/shared/CustomButton';

describe('CustomButton', () => {
	it('renders correctly when not disabled and dark color', () => {
		const wrapper = shallowMount(CustomButton, {
			props: {
				color: 'dark',
				disabled: false,
			},
		});

		expect(wrapper.find('button').exists()).toBe(true);
		expect(wrapper.classes()).toContain('btn_dark');
		expect(wrapper.classes()).not.toContain('btn_yellow');
		expect(wrapper.find('button').classes()).not.toContain('btn_disabled');
	});

	it('renders correctly when disabled and yellow color', () => {
		const wrapper = shallowMount(CustomButton, {
			props: {
				color: 'yellow',
				disabled: true,
			},
		});

		expect(wrapper.find('button').exists()).toBe(true);
		expect(wrapper.classes()).toContain('btn_yellow');

		expect(wrapper.find('button').classes()).toContain('btn_disabled');
	});

	it('emits click event when clicked', () => {
		const wrapper = shallowMount(CustomButton, {
			props: {
				handleClick: jest.fn(),
			},
		});

		wrapper.find('button').trigger('click');
		expect(wrapper.vm.handleClick).toHaveBeenCalled();
	});

	it('check click event when clicked button with disabled property', () => {
		const wrapper = shallowMount(CustomButton, {
			props: {
				handleClick: jest.fn(),
				disabled: true,
			},
		});

		wrapper.find('button').trigger('click');
		expect(wrapper.vm.handleClick).not.toBeCalled();
	});
});
