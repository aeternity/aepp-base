/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { get, flatMap } from 'lodash-es';
import Vue from 'vue';
import { handleUnknownError } from '../../../lib/utils';

export default store => store.registerModule('appsMetadata', {
  namespaced: true,

  state: {
    cachedManifests: get(store.state, 'appsMetadata.cachedManifests', {}),
    isManifestsFetching: {},
  },

  getters: {
    get: ({ cachedManifests }) => (host) => {
      store.dispatch('appsMetadata/ensureManifestCached', host);
      const manifest = cachedManifests[host] || {};

      const metadata = {
        name: manifest.short_name || manifest.name || host,
      };

      const icons = flatMap(
        manifest.icons || [],
        ({ sizes = '', ...icon }) => sizes.split(' ').map(size => ({ ...icon, size })),
      )
        .map(({ size, ...icon }) => ({ ...icon, side: Math.max(...size.split('x')) }));
      const icon = icons.reduce((p, i) => {
        if (!p) return i || p;
        if (p.side < 75) return i.side > p.side ? i : p;
        return i.side > 75 && i.side < p.side ? i : p;
      }, null);
      if (icon) {
        metadata.icon = new URL(icon.src, `http://${host}`).toString();
      }

      return metadata;
    },
  },

  mutations: {
    setCachedManifest({ cachedManifests }, { host, manifest }) {
      Vue.set(cachedManifests, host, manifest);
    },
    setManifestFetching({ isManifestsFetching }, { host, fetching }) {
      Vue.set(isManifestsFetching, host, fetching);
    },
  },

  actions: {
    async fetchManifest(_, host) {
      const fetchTextCors = async url => (
        await fetch(`https://cors-anywhere.herokuapp.com/${url}`)).text();
      let appUrl = new URL(`http://${host}`);
      if (appUrl.hostname === 'localhost') return {};

      const parser = new DOMParser();
      const document = parser.parseFromString(await fetchTextCors(appUrl), 'text/html');

      const base = document.querySelector('base');
      if (base) appUrl = new URL(base.getAttribute('href'), appUrl);

      const manifestUrl = new URL(
        document.querySelector('link[rel=manifest]').getAttribute('href'),
        appUrl,
      );

      return JSON.parse(await fetchTextCors(manifestUrl));
    },
    async ensureManifestCached(
      { state: { cachedManifests, isManifestsFetching }, commit, dispatch }, host,
    ) {
      if (isManifestsFetching[host]) return;
      const manifest = cachedManifests[host];
      if (manifest && manifest.fetchedAt) {
        const date = new Date(manifest.fetchedAt);
        date.setDate(date.getDate() + 1);
        if (date > new Date()) return;
      }

      commit('setManifestFetching', { host, fetching: true });
      let newManifest;
      try {
        newManifest = await dispatch('fetchManifest', host);
      } catch (error) {
        newManifest = {};
        handleUnknownError(error);
      }
      commit('setCachedManifest', {
        host,
        manifest: { ...newManifest, fetchedAt: new Date().toJSON() },
      });
      commit('setManifestFetching', { host, fetching: false });
    },
  },
});
