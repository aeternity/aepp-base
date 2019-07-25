import { shallowMount } from '@vue/test-utils';
import UrlForm from '../UrlForm.vue';

describe('UrlForm', () => {
  [{
    typedAddress: 'example.com',
    routerPath: '/browser/example.com',
  }, {
    typedAddress: 'https://example.com/test',
    routerPath: '/browser/https://example.com/test',
  }].forEach(({ typedAddress, routerPath }) => it(
    `passes address "${typedAddress}" to router properly`,
    () => {
      const push = jest.fn();
      const wrapper = shallowMount(UrlForm, {
        mocks: {
          $router: { push },
          $t: () => 'locale-specific-text',
        },
      });
      wrapper.vm.newUrl = typedAddress;
      wrapper.vm.submitHandler();
      expect(push).toHaveBeenCalledWith(routerPath);
    },
  ));
});
