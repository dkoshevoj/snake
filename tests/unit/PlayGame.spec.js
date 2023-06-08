import { mount } from '@vue/test-utils';
import PlayGame from '@/views/PlayGame.vue';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
// import { createStore } from 'vuex';

const MockRouterView = {
	template: '<div></div>',
};

describe('PlayGame', () => {
	let wrapper, router;
	// let store;

	beforeEach(() => {
		// store = createStore({
		// 	modules: {
		// 		field: {
		// 			namespaced: true,
		// 			state: {
		// 				blocksCollection: [],
		//         fieldWidth: 15,
		//         record: 0,
		//         velocity: '4',
		// 			},
		// 			getters: {
		// 				blocksCollection: state => state.blocksCollection,
		//         fieldWidth: state => state.fieldWidth,
		//         record: state => state.record,
		//         velocity: state => state.velocity,
		// 			},
		// 			actions: {
		// 				setCollection: jest.fn(),
		// 				setFieldWidth: jest.fn(),
		// 				setVelocity: jest.fn(),
		// 				setRecord: jest.fn(),
		// 			},
		// 		},
		// 	},
		// });

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

		wrapper = mount(PlayGame, {
			global: {
				plugins: [store, router],
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('renders the component', () => {
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.vm.fieldWidth).toBe(15);
	});

	it('calls the init method when mounted', () => {
		const initSpy = jest.spyOn(wrapper.vm, 'init');
		wrapper.vm.$options.mounted.call(wrapper.vm);
		expect(initSpy).toHaveBeenCalled();

		initSpy.mockRestore();
	});

	it('initializes the component with correct data', () => {
		const blocks = wrapper.findAllComponents('.excel');
		expect(blocks.length).toBe(wrapper.vm.fieldWidth * wrapper.vm.fieldWidth);
		expect(wrapper.vm.dir).toBe('');
		expect(wrapper.vm.snake).toEqual([
			{
				x: Math.round(wrapper.vm.fieldWidth / 2),
				y: Math.round(wrapper.vm.fieldWidth / 2),
			},
		]);
		expect(wrapper.vm.food).not.toContain(NaN);
		expect(wrapper.vm.score).toBe(0);
		expect(wrapper.vm.isOpenModal).toBe(false);
		expect(wrapper.vm.speedPoints).toEqual({
			1: 150,
			2: 120,
			3: 100,
			4: 80,
			5: 60,
		});
	});

	it('registers and unregisters the keydown event listener', () => {
		const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
		const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
		wrapper.vm.$options.mounted.call(wrapper.vm);
		expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', wrapper.vm.getDirection);
		wrapper.vm.$options.beforeUnmount.call(wrapper.vm);
		expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', wrapper.vm.getDirection);

		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});

	it('updates the computed property "speed"', () => {
		expect(wrapper.vm.speed).toBe(100);
	});

	it('creates a food object with valid coordinates', () => {
		wrapper.vm.createFood();
		const food = wrapper.vm.food;
		expect(food.x).toBeGreaterThanOrEqual(1);
		expect(food.x).toBeLessThanOrEqual(wrapper.vm.fieldWidth);
		expect(food.y).toBeGreaterThanOrEqual(1);
		expect(food.y).toBeLessThanOrEqual(wrapper.vm.fieldWidth);
	});

	it('changes the direction when a key is pressed', () => {
		const eventUp = { keyCode: 38 };
		wrapper.vm.getDirection(eventUp);
		expect(wrapper.vm.dir).toBe('up');
	});

	it('checks for collision and displays game over dialog', () => {
		const checkCollisionSpy = jest.spyOn(wrapper.vm, 'checkCollision');
		const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

		const snakeWithoutCollision = [
			{ x: 8, y: 8 },
			{ x: 9, y: 8 },
			{ x: 10, y: 8 },
			{ x: 11, y: 8 },
			{ x: 12, y: 8 },
		];
		const snakeWithCollision = [
			{ x: 8, y: 8 },
			{ x: 9, y: 8 },
			{ x: 9, y: 9 },
			{ x: 8, y: 9 },
			{ x: 8, y: 8 },
		];

		wrapper.vm.snake = snakeWithoutCollision;
		wrapper.vm.checkCollision();
		expect(checkCollisionSpy).toHaveBeenCalled();
		expect(wrapper.vm.isOpenModal).toBe(false);
		expect(clearIntervalSpy).not.toHaveBeenCalled();

		// Emulating collission
		wrapper.vm.snake = snakeWithCollision;
		wrapper.vm.checkCollision();
		expect(checkCollisionSpy).toHaveBeenCalled();
		expect(wrapper.vm.isOpenModal).toBe(true);
		expect(clearIntervalSpy).toHaveBeenCalled();

		checkCollisionSpy.mockRestore();
		clearIntervalSpy.mockRestore();
	});

	it('restarts the game with correct initial values', () => {
		const restartGameSpy = jest.spyOn(wrapper.vm, 'restartGame');
		const createFoodSpy = jest.spyOn(wrapper.vm, 'createFood');

		restartGameSpy();

		expect(wrapper.vm.snake).toEqual([
			{
				x: Math.round(wrapper.vm.fieldWidth / 2),
				y: Math.round(wrapper.vm.fieldWidth / 2),
			},
		]);
		expect(wrapper.vm.dir).toBe('');
		expect(createFoodSpy).toHaveBeenCalled();
		expect(wrapper.vm.isOpenModal).toBeFalsy();
		expect(wrapper.vm.score).toEqual(0);

		restartGameSpy.mockRestore();
		createFoodSpy.mockRestore();
	});

	it('draws the game correctly', () => {
		const drawGameSpy = jest.spyOn(wrapper.vm, 'drawGame');
		jest.useFakeTimers();
		wrapper.vm.timer = setInterval(wrapper.vm.drawGame, 100);
		expect(drawGameSpy).toHaveBeenCalledTimes(0);
		jest.runOnlyPendingTimers();
		expect(drawGameSpy).toHaveBeenCalledTimes(1);
		jest.runOnlyPendingTimers();
		expect(drawGameSpy).toHaveBeenCalledTimes(2);

		jest.useRealTimers();
		drawGameSpy.mockRestore();
	});
});
