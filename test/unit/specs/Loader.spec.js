import Vue from 'vue'
import Loader from '@/components/Loader'

describe('Loader.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Loader)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
