/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import { update, get } from 'lodash-es';
import BigNumber from 'bignumber.js';
import Vue from 'vue';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { MAGNITUDE } from '../../../lib/constants';
import {
  handleUnknownError, isAccountNotFoundError, getAddressByNameEntry, isAensName,
} from '../../../lib/utils';

export default (store) => {
  store.registerModule('names', {
    namespaced: true,
    state: {
      names: {},
      defaults: get(store.state, 'names.defaults', {}),
      owned: null,
    },
    getters: {
      get: (
        { names }, { getDefault }, { accounts: { list } }, rootGetters,
      ) => (id, local = true) => {
        store.dispatch('names/fetch', { id });
        const defaultName = getDefault(id);
        const key = defaultName
          ? (() => {
            store.dispatch('names/fetch', { id: defaultName });
            const isDefaultNameActual = names[id].address !== undefined
              && names[defaultName].address === names[id].address;
            return isDefaultNameActual ? defaultName : id;
          })()
          : id;
        if (names[key].name) return names[key].name;
        if (local) {
          const account = list.find(a => a.address === id);
          if (account) return rootGetters['accounts/getName'](account);
        }
        return '';
      },
      getAddress: ({ names }) => (id) => {
        if (Crypto.isAddressValid(id)) return id;
        store.dispatch('names/fetch', { id });
        if (names[id].address) return names[id].address;
        return '';
      },
      getDefault: ({ defaults }, getters, { sdk }) => address => (
        sdk.then ? undefined : defaults[`${address}-${sdk.getNetworkId()}`]
      ),
      isPending: ({ owned }) => name => (
        !!((owned && owned.names.find(t => t.name === name)) || {}).pending
      ),
    },
    mutations: {
      set({ names }, {
        key, address, name, hash,
      }) {
        const entry = { address, name, hash };
        [key, address, hash, name]
          .filter(k => k)
          .forEach(k => Vue.set(names, k, entry));
      },
      setOwned(state, owned) {
        state.owned = owned;
      },
      setDefault({ defaults }, { address, networkId, name }) {
        Vue.set(defaults, `${address}-${networkId}`, name);
      },
      reset(state) {
        state.names = {};
        state.owned = null;
      },
    },
    actions: {
      async getHeight({ rootState }) {
        let subscription;
        const height = await new Promise((resolve) => {
          subscription = rootState.observables.topBlockHeight.subscribe(h => h !== 0 && resolve(h));
        });
        subscription.unsubscribe();
        return height;
      },
      async fetch({
        rootState, state, commit, dispatch,
      }, { id, force }) {
        if (!force && state.names[id]) return;
        commit('set', { key: id });
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        if (id.startsWith('ak_')) {
          const height = await dispatch('getHeight');
          const names = (await sdk.middleware.getNameByAddress(id))
            .filter(({ expiresAt }) => expiresAt > height);
          if (names.length) {
            commit('set', { address: id, name: names[0].name, hash: names[0].nameHash });
          }
        } else if (id.startsWith('nm_')) {
          const { name: nameEntry } = await sdk.middleware.getNameByHash(id);
          commit('set', {
            address: getAddressByNameEntry(nameEntry),
            name: nameEntry.name,
            hash: nameEntry.nameHash,
          });
        } else if (isAensName(id)) {
          const nameEntry = await sdk.api.getNameEntryByName(id);
          commit('set', {
            address: getAddressByNameEntry(nameEntry),
            name: id,
            hash: nameEntry.id,
          });
        } else {
          throw new Error(`Unknown id: ${id}`);
        }
      },
      async fetchOwned({ rootState, commit, dispatch }) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;

        const getPendingNameClaimTransactions = address => sdk.api
          .getPendingAccountTransactionsByPubkey(address)
          .then(
            ({ transactions }) => transactions
              .filter(({ tx: { type } }) => type === 'NameClaimTx')
              .map(({ tx, ...otherTx }) => ({
                ...otherTx,
                ...tx,
                pending: true,
                owner: tx.accountId,
              })),
            (error) => {
              if (!isAccountNotFoundError(error)) handleUnknownError(error);
              return [];
            },
          );

        const namesPromise = Promise.all(
          rootState.accounts.list.map(({ address }) => Promise.all([
            getPendingNameClaimTransactions(address),
            sdk.middleware.getActiveNames({ owner: address }),
          ])),
        ).then(names => names.flat(2));

        const bidsPromise = Promise.all([
          dispatch('getHeight'),
          ...rootState.accounts.list
            .map(({ address }) => sdk.middleware.getNameAuctionsBidsbyAddress(address)),
        ]).then(([height, ...bidsByAddress]) => bidsByAddress
          .flat()
          .filter(({ nameAuctionEntry }) => nameAuctionEntry.expiration > height)
          .filter(({ nameAuctionEntry, transaction }) => nameAuctionEntry
            .winningBid === transaction.tx.nameFee)
          .map(bid => update(
            bid,
            'transaction.tx.nameFee',
            v => BigNumber(v).shiftedBy(-MAGNITUDE),
          )));

        const [names, bids] = await Promise.all([namesPromise, bidsPromise]);
        commit('setOwned', { names, bids });
      },
      async fetchAuctionEntry({ rootState }, name) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        const { info, bids } = await sdk.middleware.getAuctionInfoByName(name);
        return {
          ...info,
          bids: bids.map(({ tx }) => ({
            ...tx,
            nameFee: BigNumber(tx.nameFee).shiftedBy(-MAGNITUDE),
          })),
        };
      },
      setDefault({ rootState: { sdk }, commit }, { name, address }) {
        commit('setDefault', { name, address, networkId: sdk.getNetworkId() });
      },
      async updatePointer({
        rootState: { sdk }, state, commit, dispatch,
      }, { name, address }) {
        const nameEntry = await sdk.api.getNameEntryByName(name);
        await sdk.aensUpdate(nameEntry.id, address);
        const prevAddr = getAddressByNameEntry(nameEntry);
        if (prevAddr && state.names[prevAddr] && state.names[prevAddr].hash === nameEntry.id) {
          commit('set', { address: prevAddr });
        }
        await dispatch('fetch', { id: name, force: true });
      },
    },
  });

  store.watch((state, { currentNetwork }) => currentNetwork, () => store.commit('names/reset'));
};
