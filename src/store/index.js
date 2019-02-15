/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import BigNumber from 'bignumber.js';
import { update, flatMap } from 'lodash-es';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { spendTxNative } from '@aeternity/aepp-sdk/es/tx/js';
import { appsRegistry } from '../lib/appsRegistry';
import networksRegistry from '../lib/networksRegistry';
import { MAGNITUDE } from '../lib/constants';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import persistState from './plugins/persistState';
import pollBalance from './plugins/pollBalance';
import ledgerConnection from './plugins/ledgerConnection';
import remoteConnection from './plugins/remoteConnection';
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection';
import decryptAccounts from './plugins/decryptAccounts';
import initSdk from './plugins/initSdk';
import modals from './plugins/modals';
import registerServiceWorker from './plugins/registerServiceWorker';
import browserPathTracker from './plugins/browserPathTracker';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    persistState(({
      migrations, apps, rpcUrl, selectedIdentityIdx, addressBook, customNetworks,
      bookmarkedApps, cachedAppManifests,
      mobile, desktop,
    }) => ({
      migrations,
      ...process.env.IS_MOBILE_DEVICE ? {
        apps,
        rpcUrl,
        selectedIdentityIdx,
        addressBook,
        customNetworks,
        bookmarkedApps,
        cachedAppManifests,
        mobile: {
          keystore: mobile.keystore,
          accountCount: mobile.accountCount,
          followers: Object.entries(mobile.followers)
            .reduce((p, [k, { id, name, disconnectedAt }]) => (
              { ...p, [k]: { id, name, disconnectedAt } }), {}),
          names: mobile.names,
        },
      } : {
        desktop: {
          peerId: desktop.peerId,
          ledgerAccountNumber: desktop.ledgerAccountNumber,
        },
      },
    })),
    pollBalance,
    initSdk,
    remoteConnection,
    modals,
    registerServiceWorker,
    ...process.env.IS_MOBILE_DEVICE
      ? [decryptAccounts, notificationOnRemoteConnection, browserPathTracker] : [ledgerConnection],
  ],

  modules: process.env.IS_MOBILE_DEVICE ? { mobile: mobileModule } : { desktop: desktopModule },

  state: {
    migrations: {},
    loginTarget: '',
    selectedAppIdxToRemove: -1,
    selectedIdentityIdx: 0,
    balances: {},
    addresses: [],
    rpcUrl: networksRegistry[0].url,
    sdk: null,
    alert: null,
    notification: null,
    apps: Object.keys(appsRegistry),
    addressBook: [],
    customNetworks: [],
    bookmarkedApps: [],
    cachedAppManifests: {},
  },

  getters: {
    identities: ({ balances }, { addresses }, { mobile }) => addresses.map((e, index) => ({
      balance: balances[e] || BigNumber(0),
      address: e,
      name: process.env.IS_MOBILE_DEVICE ? mobile.names[index] : e.substr(0, 6),
    })),
    activeIdentity: ({ selectedIdentityIdx }, { identities }) => identities[selectedIdentityIdx],
    totalBalance: (state, { identities }) => identities
      .reduce((sum, { balance }) => sum.plus(balance), BigNumber(0)),
    networks: ({ customNetworks }) => [
      ...networksRegistry,
      ...customNetworks.map(network => ({ ...network, custom: true })),
    ],
    currentNetwork: ({ rpcUrl }, { networks }) => networks.find(({ url }) => url === rpcUrl) || {
      name: rpcUrl,
      url: rpcUrl,
    },
    getBookmarkedApp: ({ bookmarkedApps }) => appHost => bookmarkedApps
      .find(({ host }) => host === appHost),
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
    markMigrationAsApplied(state, migrationId) {
      Vue.set(state.migrations, migrationId, true);
    },
    setLoginTarget(state, loginTarget) {
      state.loginTarget = loginTarget;
    },
    setRPCUrl(state, rpcUrl) {
      state.rpcUrl = rpcUrl;
    },
    setSdk(state, sdk) {
      state.sdk = sdk;
    },
    assignToSdk(state, object) {
      Object.assign(state.sdk, object);
    },
    addApp(state, app) {
      state.apps.push(app);
    },
    selectAppToRemove(state, selectedAppIdxToRemove = -1) {
      state.selectedAppIdxToRemove = selectedAppIdxToRemove;
    },
    removeSelectedApp(state) {
      state.apps.splice(state.selectedAppIdxToRemove, 1);
      state.selectedAppIdxToRemove = -1;
    },
    selectIdentity(state, selectedIdentityIdx) {
      state.selectedIdentityIdx = selectedIdentityIdx;
    },
    setBalance(state, { address, balance }) {
      Vue.set(state.balances, address, balance);
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
      if (store.getters.getBookmarkedApp(host)) {
        state.bookmarkedApps = state.bookmarkedApps.filter(app => app.host !== host);
        return;
      }
      state.bookmarkedApps.push({ host });
    },
    grantAccessToAccount(state, { appHost, accountAddress }) {
      if (!store.getters.getBookmarkedApp(appHost)) {
        store.commit('toggleAppBookmarking', appHost);
      }

      const app = store.getters.getBookmarkedApp(appHost);
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
    async addApp({ commit }, arg) {
      if (appsRegistry[arg]) {
        commit('addApp', arg);
        return;
      }

      const path = arg.replace(/^https?:\/\//i, '');
      let name;
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${path}`);
        const text = await response.text();
        const el = document.createElement('html');
        el.innerHTML = text;
        name = el.getElementsByTagName('title')[0].innerText;
      } catch (e) {
        console.error(e);
      }
      name = name || prompt('Enter Title');
      commit('addApp', { path, name });
    },
    updateAllBalances({ getters: { addresses }, dispatch }) {
      addresses.forEach(address => dispatch('updateBalance', address));
    },
    async updateBalance({ state: { sdk, balances }, commit }, address) {
      const balance = BigNumber(await sdk.balance(address, { format: false }).catch(() => 0))
        .shiftedBy(-MAGNITUDE);
      if (balances[address] && balances[address].isEqualTo(balance)) return;
      commit('setBalance', { address, balance });
    },
    async genSpendTxBinary({ state: { sdk } }, transaction) {
      const spendTx = spendTxNative({
        nonce: +(await sdk.api.getAccountByPubkey(transaction.senderId)).nonce + 1,
        ...transaction,
        fee: transaction.fee.shiftedBy(MAGNITUDE),
        amount: transaction.amount.shiftedBy(MAGNITUDE),
      }).tx;
      return Crypto.decodeBase64Check(spendTx.split('_')[1]);
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
});

export default store;
