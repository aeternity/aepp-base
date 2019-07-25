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
}, {
  inputUrl: 'localhost:8080',
  outputUrl: 'http://localhost:8080/',
}].forEach(({ inputUrl, outputUrl }) => it(
  `replaces "${inputUrl}" path with "${outputUrl}"`,
  () => {
    const wrapper = shallowMount(AppBrowser, {
      mocks: {
        $route: { fullPath: `/browser/${inputUrl}` },
        $store: { state: { apps: [] } },
        $globals: { IS_IOS: false },
        $t: () => 'locale-specific-text',
      },
    });
    expect(wrapper.vm.url).toBe(outputUrl);
  },
)));
