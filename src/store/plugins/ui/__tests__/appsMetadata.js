import Vue from 'vue';
import Vuex from 'vuex';
import appsMetadata from '../appsMetadata';
import manifestMozillaDocs from './assets/manifestMozillaDocs.json';
import manifestTwitter from './assets/manifestTwitter.json';

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(Vuex);
const store = new Vuex.Store({ plugins: [appsMetadata] });

describe('appsMetadata', () => {
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
      store.commit('appsMetadata/setCachedManifest', { host, manifest });
      expect(store.getters['appsMetadata/get'](host)).toEqual(metadata);
    },
  ));
});
