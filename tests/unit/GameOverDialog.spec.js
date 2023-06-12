import { mount } from '@vue/test-utils';
import GameOverDialog from '@/components/GameOverDialog';

describe('GameOverDialog', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(GameOverDialog, {
			props: {
				isShowModal: true,
				closeModal: jest.fn(),
				restartGame: jest.fn(),
				score: 100,
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('renders correctly when showModal is true', async () => {
		expect(await wrapper.find('.dialog__text').text()).toContain('Your score: 100');
		expect(await wrapper.find('.dialog__btn').findAll('button').length).toBe(2);
	});

	it('calls closeModal when Cancel button is clicked', async () => {
		await wrapper.find('#game-over-dialog-btn-dark').trigger('click');
		expect(wrapper.vm.closeModal).toHaveBeenCalled();
	});

	it('calls restartGame when Restart button is clicked', async () => {
		await wrapper.find('#game-over-dialog-btn-yellow').trigger('click');
		expect(wrapper.vm.restartGame).toHaveBeenCalled();
	});
});
