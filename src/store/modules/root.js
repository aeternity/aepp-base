/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { update, flatMap, merge } from 'lodash-es';
import store from '../index';
import networksRegistry, { defaultNetwork } from '../../lib/networksRegistry';
import { genRandomBuffer } from '../utils';

export default {
  state: () => ({
    migrations: {},
    loginTarget: '',
    sdkUrl: networksRegistry[0].url,
    sdk: null,
    alert: null,
    notification: null,
    serviceWorkerRegistration: null,
    addressBook: [],
    customNetworks: [],
    apps: [],
    cachedAppManifests: {},
    peerId: Buffer.from(genRandomBuffer(15)).toString('base64'),
  }),

  getters: {
    networks: ({ customNetworks }) => [
      ...networksRegistry,
      ...customNetworks.map(network => ({ ...defaultNetwork, ...network, custom: true })),
    ],
    currentNetwork: ({ sdkUrl }, { networks }) => networks.find(({ url }) => url === sdkUrl) || {
      ...defaultNetwork,
      name: sdkUrl,
      url: sdkUrl,
    },
    getApp: ({ apps }) => appHost => apps.find(({ host }) => host === appHost),
    getAppMetadata: ({ cachedAppManifests }) => (host) => {
      const manifest = cachedAppManifests[host];

      if (typeof manifest !== 'object') {
        if (manifest !== 'fetching') {
          store.commit('setCachedAppManifest', {
            host,
            manifest: 'fetching',
          });
          store.dispatch('fetchAppManifest', host)
            .then(fetchedManifest => store.commit('setCachedAppManifest', {
              host,
              manifest: fetchedManifest,
            }));
        }
        return { name: host };
      }

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
    syncState(state, remoteState) {
      Object.entries(merge({}, state, remoteState))
        .forEach(([name, value]) => Vue.set(state, name, value));
    },
    markMigrationAsApplied(state, migrationId) {
      Vue.set(state.migrations, migrationId, true);
    },
    setLoginTarget(state, loginTarget) {
      state.loginTarget = loginTarget;
    },
    setSdkUrl(state, sdkUrl) {
      state.sdkUrl = sdkUrl;
    },
    setSdk(state, sdk) {
      state.sdk = sdk;
    },
    setAlert(state, options) {
      state.alert = options;
    },
    setNotification(state, options) {
      state.notification = options;
    },
    addAddressBookItem(state, item) {
      state.addressBook.push(item);
    },
    addNetwork(state, network) {
      state.customNetworks.push(network);
    },
    removeNetwork(state, networkIdx) {
      state.customNetworks.splice(networkIdx - networksRegistry.length, 1);
    },
    toggleAppBookmarking(state, host) {
      const app = store.getters.getApp(host);
      if (app) {
        Vue.set(app, 'bookmarked', !app.bookmarked);
        return;
      }
      state.apps.push({ host, bookmarked: true });
    },
    grantAccessToAccount(state, { appHost, accountAddress }) {
      if (!store.getters.getApp(appHost)) {
        state.apps.push({ host: appHost });
      }

      const app = store.getters.getApp(appHost);
      update(
        app,
        'permissions.accessToAccounts',
        (arr = []) => {
          arr.push(accountAddress);
          return arr;
        },
      );
    },
    setCachedAppManifest({ cachedAppManifests }, { host, manifest }) {
      Vue.set(cachedAppManifests, host, manifest);
    },
    setServiceWorkerRegistration(state, serviceWorkerRegistration) {
      state.serviceWorkerRegistration = serviceWorkerRegistration;
    },
  },

  actions: {
    alert({ commit }, options) {
      return new Promise(resolve => commit('setAlert', {
        ...options,
        resolve: () => {
          commit('setAlert');
          resolve();
        },
      }));
    },
    setNotification({ commit }, options) {
      commit('setNotification', options);
      if (options.autoClose) setTimeout(() => commit('setNotification'), 3000);
    },
    async fetchAppManifest(_, host) {
      const fetchTextCors = async url => (
        await fetch(`https://cors-anywhere.herokuapp.com/${url}`)).text();
      try {
        const appUrl = new URL(`http://${host}`);
        if (appUrl.hostname === 'localhost') return {};

        const parser = new DOMParser();
        const document = parser.parseFromString(await fetchTextCors(appUrl), 'text/html');
        const base = document.createElement('base');
        base.href = appUrl;
        document.head.appendChild(base);
        const manifestUrl = document.querySelector('link[rel=manifest]').href;

        const manifest = JSON.parse(await fetchTextCors(manifestUrl));
        manifest.fetchedAt = new Date().toJSON();
        return manifest;
      } catch (e) {
        return {};
      }
    },
  },
};
