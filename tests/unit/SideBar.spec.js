import { mount } from '@vue/test-utils';
import SideBar from '@/components/SideBar.vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

const MockRouterView = {
	template: '<div></div>',
};

describe('SideBar', () => {
	let wrapper, store, router;
	beforeEach(() => {
		store = createStore({
			modules: {
				field: {
					namespaced: true,
					actions: {
						setRecord: jest.fn(),
					},
				},
			},
		});

		router = createRouter({
			history: createWebHistory(),
			routes: [
				{
					path: '/',
					name: 'Home',
					component: MockRouterView,
				},
			],
		});

		wrapper = mount(SideBar, {
			props: {
				reset: jest.fn(),
			},
			global: {
				plugins: [store, router],
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('renders correctly', () => {
		expect(wrapper.find('.sidebar__title').text()).toBe('To control the game press the arrows');
		expect(wrapper.find('.sidebar__link').text()).toBe('Return to home page');
		expect(wrapper.find('#sidebar-btn-reset-game').text()).toBe('Restart game');
		expect(wrapper.find('#sidebar-btn-reset-record').text()).toBe('Reset record');
		expect(wrapper.find('.sidebar__description').text()).toBe('feed your snake!');
	});

	it('calls reset method when Restart game button is clicked', () => {
		wrapper.find('.sidebar__control-btn').trigger('click');
		expect(wrapper.vm.reset).toHaveBeenCalled();
	});

	it('calls setRecord method when Reset record button is clicked', () => {
		const resetRecordSpy = jest.spyOn(wrapper.vm, 'setRecord');

		const customButtonComponent = wrapper.findComponent('#sidebar-btn-reset-record');
		customButtonComponent.vm.handleClick();

		expect(resetRecordSpy).toHaveBeenCalled();

		resetRecordSpy.mockRestore();
	});

	it('calls setRecord method and removes record from localStorage when Reset record button is clicked', () => {
		const resetRecordSpy = jest.spyOn(wrapper.vm, 'setRecord');

		// Mock localStorage.removeItem
		const removeItemMock = jest.fn();
		Object.defineProperty(window, 'localStorage', {
			value: {
				removeItem: removeItemMock,
			},
		});

		wrapper.find('#sidebar-btn-reset-record').trigger('click');

		expect(removeItemMock).toHaveBeenCalledWith('record');
		expect(resetRecordSpy).toHaveBeenCalled();

		resetRecordSpy.mockRestore();
	});
});
