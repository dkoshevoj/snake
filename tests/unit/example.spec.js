import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Fat Snake 2Select size'
    const wrapper = shallowMount(HomeView, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
