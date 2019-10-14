/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { update, flatMap, mergeWith } from 'lodash-es';
import store from '../index'; // eslint-disable-line import/no-cycle
import networksRegistry, { defaultNetwork } from '../../lib/networksRegistry';
import { handleUnknownError } from '../../lib/utils';
import { genRandomBuffer } from '../utils';

export default {
  state: {
    migrations: {},
    loginTarget: '',
    sdkUrl: networksRegistry[0].url,
    sdk: null,
    serviceWorkerRegistration: null,
    customNetworks: [],
    apps: [],
    cachedAppManifests: {},
    isAppManifestsFetching: {},
    peerId: Buffer.from(genRandomBuffer(15)).toString('base64'),
    onLine: true,
  },

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
      store.dispatch('ensureAppManifestCached', host);
      const manifest = cachedAppManifests[host] || {};

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
      const customizer = (objValue, srcValue) => {
        if (!Array.isArray(srcValue)) return undefined;
        if (!Array.isArray(objValue)) return srcValue;
        return srcValue.map((el, idx) => (
          el && typeof el === 'object' ? mergeWith({}, objValue[idx], el, customizer) : el
        ));
      };
      Object.entries(mergeWith({}, state, remoteState, customizer))
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
    toggleAccessToAccount(state, { appHost, accountAddress }) {
      if (!store.getters.getApp(appHost)) {
        state.apps.push({ host: appHost });
      }

      const app = store.getters.getApp(appHost);
      update(
        app,
        'permissions.accessToAccounts',
        (arr = []) => (arr.includes(accountAddress)
          ? arr.filter(address => address !== accountAddress)
          : [...arr, accountAddress]),
      );
    },
    setCachedAppManifest({ cachedAppManifests }, { host, manifest }) {
      Vue.set(cachedAppManifests, host, manifest);
    },
    setAppManifestFetching({ isAppManifestsFetching }, { host, fetching }) {
      Vue.set(isAppManifestsFetching, host, fetching);
    },
    setServiceWorkerRegistration(state, serviceWorkerRegistration) {
      state.serviceWorkerRegistration = serviceWorkerRegistration;
    },
    setOnLine(state, onLine) {
      state.onLine = onLine;
    },
  },

  actions: {
    async fetchAppManifest(_, host) {
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
    async ensureAppManifestCached({ state: { cachedAppManifests, isAppManifestsFetching } }, host) {
      if (isAppManifestsFetching[host]) return;
      const manifest = cachedAppManifests[host];
      if (manifest && manifest.fetchedAt) {
        const date = new Date(manifest.fetchedAt);
        date.setDate(date.getDate() + 1);
        if (date > new Date()) return;
      }

      store.commit('setAppManifestFetching', { host, fetching: true });
      let newManifest;
      try {
        newManifest = await store.dispatch('fetchAppManifest', host);
      } catch (error) {
        newManifest = {};
        handleUnknownError(error);
      }
      store.commit('setCachedAppManifest', {
        host,
        manifest: { ...newManifest, fetchedAt: new Date().toJSON() },
      });
      store.commit('setAppManifestFetching', { host, fetching: false });
    },
  },
};
