import { shallowMount } from '@vue/test-utils';
import ModalWindow from '@/components/shared/ModalWindow';

describe('ModalWindow', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(ModalWindow, {
			props: {
				title: 'Test Modal',
				handleClick: jest.fn(),
				keyEventListener: jest.fn(),
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('Check that the header is displayed correctly', () => {
		expect(wrapper.find('.modal__inner-title').text()).toBe(wrapper.vm.title);
	});

	it('keyEventListener Event Handler is connected when mounted and disabled when unmounted', () => {
		const addEventListenerMock = jest.fn();
		const removeEventListenerMock = jest.fn();

		wrapper.vm.$options.mounted.call(addEventListenerMock);
		wrapper.vm.$options.beforeUnmount.call(removeEventListenerMock);
	});

	it('Check that the handleClick event handler is called by clicking', () => {
		wrapper.find('.modal__close-btn').trigger('click');
		expect(wrapper.vm.handleClick).toHaveBeenCalledTimes(1);
	});
});
