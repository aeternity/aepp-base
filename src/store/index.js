/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import BigNumber from 'bignumber.js';
import { update, flatMap, camelCase } from 'lodash-es';
import networksRegistry, { defaultNetwork } from '../lib/networksRegistry';
import { MAGNITUDE } from '../lib/constants';
import { fetchJson, mapKeysDeep } from './utils';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import persistState from './plugins/persistState';
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
    persistState(
      state => state,
      ({
        migrations, rpcUrl, selectedIdentityIdx, addressBook, customNetworks,
        apps, cachedAppManifests,
        mobile, desktop,
      }) => ({
        migrations,
        ...process.env.IS_MOBILE_DEVICE ? {
          rpcUrl,
          selectedIdentityIdx,
          addressBook,
          customNetworks,
          apps,
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
      }),
    ),
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
    selectedIdentityIdx: 0,
    transactions: {},
    addresses: [],
    rpcUrl: networksRegistry[0].url,
    sdk: null,
    alert: null,
    notification: null,
    addressBook: [],
    customNetworks: [],
    apps: [],
    cachedAppManifests: {},
  },

  getters: {
    identities: ({ transactions }, { addresses }, { mobile }) => addresses
      .map((e, index) => ({
        transactions: transactions[e] || [],
        address: e,
        name: process.env.IS_MOBILE_DEVICE ? mobile.names[index] : e.substr(0, 6),
      })),
    activeIdentity: ({ selectedIdentityIdx }, { identities }) => identities[selectedIdentityIdx],
    networks: ({ customNetworks }) => [
      ...networksRegistry,
      ...customNetworks.map(network => ({ ...defaultNetwork, ...network, custom: true })),
    ],
    currentNetwork: ({ rpcUrl }, { networks }) => networks.find(({ url }) => url === rpcUrl) || {
      ...defaultNetwork,
      name: rpcUrl,
      url: rpcUrl,
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
      Object.assign(state, remoteState);
    },
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
    selectIdentity(state, selectedIdentityIdx) {
      state.selectedIdentityIdx = selectedIdentityIdx;
    },
    setTransactions(state, { address, transactions }) {
      Vue.set(state.transactions, address, transactions);
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
    async updateTransactions({ state: { sdk }, getters: { currentNetwork }, commit }, address) {
      const transactions = await Promise.all([
        ...mapKeysDeep(
          (await fetchJson(
            `${currentNetwork.middlewareUrl}/middleware/transactions/account/${address}`,
          ).catch(() => ({ transactions: [] }))).transactions,
          (value, key) => camelCase(key),
        ),
        ...(await sdk.api.getPendingAccountTransactionsByPubkey(address)
          .catch(() => ({ transactions: [] }))).transactions
          .map(transaction => ({
            ...transaction,
            pending: true,
          })),
      ]
        .map(async ({ blockHash, tx: { amount, fee, ...otherTx }, ...otherTransaction }) => ({
          ...otherTransaction,
          blockHash,
          time: new Date((await sdk.api.getMicroBlockHeaderByHash(blockHash)).time),
          received: address === otherTx.recipientId,
          peerId: address === otherTx.recipientId ? otherTx.senderId : otherTx.recipientId,
          tx: {
            ...otherTx,
            amount: BigNumber(amount).shiftedBy(-MAGNITUDE),
            fee: BigNumber(fee).shiftedBy(-MAGNITUDE),
          },
        })));
      commit('setTransactions', { address, transactions });
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
