import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
	let wrapper, $router;

	beforeEach(() => {
		$router = {
			push: jest.fn(),
		};

		wrapper = shallowMount(HomeView, {
			global: {
				mocks: {
					$router,
				},
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('renders the component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('renders the correct title', () => {
		const title = wrapper.find('.title');

		expect(title.text()).toBe('Fat Snake 2');
	});

	it('calls the startGame method and navigates to "/game" when the Start button is clicked', () => {
		const setFieldWidthMock = jest.fn();
		const setVelocityMock = jest.fn();

		wrapper.vm.setFieldWidth = setFieldWidthMock;
		wrapper.vm.setVelocity = setVelocityMock;

		const customButtonComponent = wrapper.findComponent({ name: 'CustomButton' });
		customButtonComponent.vm.handleClick();

		expect(setVelocityMock).toHaveBeenCalledWith(wrapper.vm.speed);
		expect(setFieldWidthMock).toHaveBeenCalledWith(wrapper.vm.selectedOption.value);
		expect($router.push).toHaveBeenCalledWith({ path: '/game' });
	});

	it('sets the initial data correctly', () => {
		expect(wrapper.vm.selectOptions).toEqual([
			{ value: 15, name: '15 cells' },
			{ value: 20, name: '20 cells' },
		]);
		expect(wrapper.vm.selectedOption).toEqual({ value: 15, name: '15 cells' });
		expect(wrapper.vm.speed).toBe(3);
	});

	it('updates the selectedOption when setSelectedOption is called', () => {
		const newSelectedOption = { value: 20, name: '20 cells' };
		wrapper.vm.setSelectedOption(newSelectedOption);
		expect(wrapper.vm.selectedOption).toEqual(newSelectedOption);
	});

	it('updates speed when input-range value changes', () => {
		const inputRange = wrapper.findComponent({ name: 'InputRange' });
		const newSpeed = 5;

		inputRange.vm.changeHandler(newSpeed);

		expect(wrapper.vm.speed).toBe(newSpeed);
	});
});
