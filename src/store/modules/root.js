/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import BigNumber from 'bignumber.js';
import {
  update, flatMap, camelCase, unionBy,
} from 'lodash-es';
import store from '../index';
import networksRegistry, { defaultNetwork } from '../../lib/networksRegistry';
import { MAGNITUDE } from '../../lib/constants';
import { fetchJson, mapKeysDeep, genRandomBuffer } from '../utils';

export default {
  state: () => ({
    migrations: {},
    loginTarget: '',
    selectedAccountIdx: 0,
    transactions: {},
    addresses: [],
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
    accounts: ({ transactions }, { addresses }, { mobile }) => addresses
      .map((e, index) => ({
        transactions: transactions[e] || [],
        address: e,
        name: process.env.IS_MOBILE_DEVICE ? mobile.accountNames[index] : e.substr(0, 6),
      })),
    activeAccount: ({ selectedAccountIdx }, { accounts }) => accounts[selectedAccountIdx],
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
      Object.assign(state, remoteState);
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
    setSelectedAccountIdx(state, selectedAccountIdx) {
      state.selectedAccountIdx = selectedAccountIdx;
    },
    setTransactions(state, { address, transactions }) {
      Vue.set(state.transactions, address, unionBy(state.transactions[address] || [], transactions, 'hash'));
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
    normalizeTransaction: async ({ state: { sdk }, getters: { activeAccount } }, {
      blockHash, time, tx: { amount, fee, ...otherTx }, ...otherTransaction
    }) => ({
      ...otherTransaction,
      time: new Date(time || (await sdk.api.getMicroBlockHeaderByHash(blockHash)).time),
      received: activeAccount.address === otherTx.recipientId,
      peerId: activeAccount.address === otherTx.recipientId
        ? otherTx.senderId
        : otherTx.recipientId,
      tx: {
        ...otherTx,
        amount: BigNumber(amount).shiftedBy(-MAGNITUDE),
        fee: BigNumber(fee).shiftedBy(-MAGNITUDE),
      },
    }),
    async updateTransactions({
      state: { sdk }, getters: { activeAccount, currentNetwork }, commit, dispatch,
    }) {
      const { address } = activeAccount;
      const transactions = await Promise.all([
        ...mapKeysDeep(
          (await fetchJson(
            `${currentNetwork.middlewareUrl}/middleware/transactions/account/${address}`,
          ).catch(() => [])),
          (value, key) => camelCase(key),
        ),
        ...(await sdk.api.getPendingAccountTransactionsByPubkey(address)
          .catch(() => ({ transactions: [] }))).transactions
          .map(transaction => ({
            ...transaction,
            pending: true,
          })),
      ]
        .map(transaction => dispatch('normalizeTransaction', transaction)));
      commit('setTransactions', { address, transactions });
    },
    async fetchTransaction({
      state: { sdk }, getters: { activeAccount }, commit, dispatch,
    }, hash) {
      if (activeAccount.transactions.find(t => t.hash === hash)) return;
      const { address } = activeAccount;
      const transaction = await dispatch('normalizeTransaction',
        await sdk.api.getTransactionByHash(hash));
      commit('setTransactions', { address, transactions: [transaction] });
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
