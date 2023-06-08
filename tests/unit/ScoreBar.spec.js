import { shallowMount } from '@vue/test-utils';
import ScoreBar from '@/components/ScoreBar.vue';

describe('ScoreBar', () => {
	it('renders score and record correctly', () => {
		const score = 10;
		const record = 20;

		const wrapper = shallowMount(ScoreBar, {
			props: { score, record },
		});

		expect(wrapper.find('.score p:nth-child(1)').text()).toBe('Score: 10');
		expect(wrapper.find('.score p:nth-child(2)').text()).toBe('Your best result: 20');
	});
});
