/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { flatMap } from 'lodash-es';
import Vue from 'vue';
import { handleUnknownError } from '../../../lib/utils';

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
        url: `https://${host}`,
        host,
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
        metadata.icon = new URL(icon.src, `https://${host}`).toString();
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
      const fetchTextCors = async (url) => (
        await fetch(`${process.env.VUE_APP_CORS_ANYWHERE_URL}/${url}`)).text();
      let appUrl = new URL(`https://${host}`);
      if (appUrl.hostname === 'localhost') return {};

      const parser = new DOMParser();
      const document = parser.parseFromString(await fetchTextCors(appUrl), 'text/html');

      const base = document.querySelector('base');
      if (base) appUrl = new URL(base.getAttribute('href'), appUrl);

      const manifestPath = document.querySelector('link[rel=manifest]')?.getAttribute('href');
      if (manifestPath != null) {
        const manifestUrl = new URL(manifestPath, appUrl);
        return JSON.parse(await fetchTextCors(manifestUrl));
      }

      const iconPath = document.querySelector('link[rel=icon]')?.getAttribute('href');
      if (iconPath != null) {
        const name = document.querySelector('title').innerText;
        const [shortName, description] = name.split(' - ');
        return {
          name,
          short_name: shortName,
          description,
          icons: [{
            src: new URL(iconPath, appUrl),
          }],
        };
      }

      return {};
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
