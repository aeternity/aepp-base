/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { flatMap } from 'lodash-es';
import Vue from 'vue';
import { handleUnknownError } from '../../../lib/utils';
import { PROTOCOL_DEFAULT } from '../../../lib/constants';

export default (store) => store.registerModule('appsMetadata', {
  namespaced: true,

  state: {
    manifests: {},
  },

  getters: {
    get: ({ manifests }) => (host) => {
      store.dispatch('appsMetadata/ensureManifestFetched', host);
      const manifest = manifests[host] || {};

      const metadata = {
        ...manifest,
        name: manifest.short_name || manifest.name || host,
      };

      const icons = flatMap(
        manifest.icons || [],
        ({ sizes = '', ...icon }) => sizes.split(' ').map((size) => ({ ...icon, size })),
      )
        .map(({ size, ...icon }) => ({ ...icon, side: Math.max(...size.split('x')) }));
      const icon = icons.reduce((p, i) => {
        if (!p) return i || p;
        if (p.side < 75) return i.side > p.side ? i : p;
        return i.side > 75 && i.side < p.side ? i : p;
      }, null);
      if (icon) {
        metadata.icon = new URL(icon.src, `${PROTOCOL_DEFAULT}//${host}`).toString();
      }

      return metadata;
    },
  },

  mutations: {
    setManifest({ manifests }, { host, manifest }) {
      Vue.set(manifests, host, manifest);
    },
  },

  actions: {
    async fetchManifest(_, host) {
      const fetchText = async (url) => (await fetch(url)).text();
      let appUrl = new URL(`https://${host}`);
      if (appUrl.hostname === 'localhost') return {};

      const parser = new DOMParser();
      const document = parser.parseFromString(await fetchText(appUrl), 'text/html');

      const base = document.querySelector('base');
      if (base) appUrl = new URL(base.getAttribute('href'), appUrl);

      const manifestUrl = new URL(
        document.querySelector('link[rel=manifest]').getAttribute('href'),
        appUrl,
      );

      return JSON.parse(await fetchText(manifestUrl));
    },
    async ensureManifestFetched({ state: { manifests }, commit, dispatch }, host) {
      if (manifests[host]) return;
      commit('setManifest', { host, manifest: {} });
      try {
        commit('setManifest', { host, manifest: await dispatch('fetchManifest', host) });
      } catch (error) {
        handleUnknownError(error);
      }
    },
  },
});
