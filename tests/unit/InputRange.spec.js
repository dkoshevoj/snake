import { shallowMount } from '@vue/test-utils';
import InputRange from '@/components/shared/InputRange';

describe('InputRange', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(InputRange, {
			props: {
				min: '1',
				max: '5',
				step: '1',
				title: 'Speed Range',
				value: '3',
				changeHandler: jest.fn(),
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('Check that the title is displayed correctly', () => {
		expect(wrapper.find('label').text()).toBe(wrapper.vm.title);
	});

	it('should emit the correct value when input changes', () => {
		const setValueMock = jest.fn();

		wrapper.vm.setValue = setValueMock;
		const inputRange = wrapper.find('#range');
		inputRange.trigger('input');

		expect(wrapper.find('#speed-range').text()).toBe(wrapper.vm.value);
		expect(setValueMock).toHaveBeenCalled();
	});

	it('calls the changeHandler when the value changes', () => {
		const inputElement = wrapper.find('#range');
		inputElement.element.value = '5';
		inputElement.trigger('input');

		expect(wrapper.vm.changeHandler).toHaveBeenCalledTimes(1);
		expect(wrapper.vm.changeHandler).toHaveBeenCalledWith('5');
	});
});
