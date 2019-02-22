import Vue from 'vue';
import { mount } from '@vue/test-utils';
import AeLink from '../AeLink.vue';

describe('AeLink', () => {
  it('displays content', () => {
    const content = '<span>test</span>';
    const wrapper = mount(AeLink, { propsData: { to: '/' }, slots: { default: content } });
    expect(wrapper.html()).toContain(content);
  });

  it('renders as `a` if `RouterLink` is not defined', () => {
    const wrapper = mount(AeLink, { propsData: { to: '/' } });
    expect(wrapper.find('a').exists()).toBeTruthy();
  });

  const testRouterLink = {
    render(createElement) {
      return createElement('div', { class: 'test-router-link' });
    },
  };

  it('renders as `RouterLink` if `RouterLink` is passed in components', () => {
    const wrapper = mount(AeLink, {
      propsData: { to: '/' },
      components: { RouterLink: testRouterLink },
    });
    expect(wrapper.find('.test-router-link').exists()).toBeTruthy();
  });

  it('renders as `a` if to is on different domain', () => {
    const wrapper = mount(AeLink, {
      propsData: { to: 'http://example.com/' },
      components: { RouterLink: testRouterLink },
    });
    expect(wrapper.find('a').exists()).toBeTruthy();
  });

  it('renders as `RouterLink` if `RouterLink` is registered globally', () => {
    Vue.component('RouterLink', testRouterLink);
    const wrapper = mount(AeLink, { propsData: { to: '/' } });
    expect(wrapper.find('.test-router-link').exists()).toBeTruthy();
    delete Vue.options.components.RouterLink;
  });
});
