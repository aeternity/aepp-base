import Vue from 'vue';
import '../__mocks__/crypto-api';
import store from '../index';
import manifestMozillaDocs from './manifestMozillaDocs.json';
import manifestTwitter from './manifestTwitter.json';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('store', () => {
  [{
    name: 'example from Mozilla docs',
    manifest: manifestMozillaDocs,
    metadata: {
      name: 'HackerWeb',
      icon: 'http://example.com/icon/hd_hi.ico',
    },
  }, {
    name: 'Twitter',
    manifest: manifestTwitter,
    metadata: {
      name: 'Twitter',
      icon: 'https://abs.twimg.com/responsive-web/web/icon-default.604e2486a34a2f6e.png',
    },
  }].forEach(({ name, manifest, metadata }) => it(
    `returns app metadata for ${name}`,
    async () => {
      const host = 'example.com';
      store.commit('setCachedAppManifest', { host, manifest });
      expect(store.getters.getAppMetadata(host)).toEqual(metadata);
    },
  ));
});
