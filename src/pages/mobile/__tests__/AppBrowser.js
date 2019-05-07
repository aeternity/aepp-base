import { shallowMount } from '@vue/test-utils';
import AppBrowser from '../AppBrowser.vue';

describe('AppBrowser', () => [{
  inputUrl: 'http://example.com/test',
  outputUrl: 'http://example.com/test',
}, {
  inputUrl: 'https://example.com',
  outputUrl: 'https://example.com/',
}, {
  inputUrl: 'example.com',
  outputUrl: 'http://example.com/',
}, {
  inputUrl: 'ftp://example.com',
  outputUrl: 'http://example.com/',
}].forEach(({ inputUrl, outputUrl }) => it(
  `replaces "${inputUrl}" path with "${outputUrl}"`,
  () => {
    const replace = jest.fn();
    const wrapper = shallowMount(AppBrowser, {
      mocks: {
        $router: { replace },
        $route: { fullPath: `/browser/${inputUrl}` },
        $store: { state: { apps: [] } },
        $globals: { IS_IOS: false },
      },
    });
    expect(wrapper.vm.url).toBe(outputUrl);
    if (inputUrl !== outputUrl) expect(replace).toHaveBeenCalledWith(`/browser/${outputUrl}`);
    else expect(replace).toHaveBeenCalledTimes(0);
  },
)));
