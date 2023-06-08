import { shallowMount } from '@vue/test-utils';
import InputRange from '@/components/shared/InputRange';

describe('InputRange', () => {
	it('should emit the correct value when input changes', () => {
		const wrapper = shallowMount(InputRange, {
			props: {
				min: '1',
				max: '5',
				step: '1',
				title: 'Speed Range',
				value: '3',
			},
		});

		const setValueMock = jest.fn();

		wrapper.vm.setValue = setValueMock;
		const inputRange = wrapper.find('#range');
		inputRange.trigger('input');

		expect(wrapper.find('#speed-range').text()).toBe(wrapper.vm.value);
		expect(setValueMock).toHaveBeenCalled();
	});

	it('calls the changeHandler when the value changes', () => {
		const changeHandler = jest.fn();
		const wrapper = shallowMount(InputRange, {
			props: {
				min: '1',
				max: '5',
				step: '1',
				title: 'Speed Range',
				value: '3',
				changeHandler,
			},
		});

		wrapper.find('input').setValue('5');

		expect(changeHandler).toHaveBeenCalledTimes(1);
		expect(changeHandler).toHaveBeenCalledWith('5');
	});
});
