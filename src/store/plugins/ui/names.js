/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import { update } from 'lodash-es';
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
      owned: null,
    },
    getters: {
      get: ({ names }, getters, { accounts: { list } }, rootGetters) => (id, local = true) => {
        store.dispatch('names/fetch', id);
        if (names[id].name) return names[id].name;
        if (local) {
          const account = list.find(a => a.address === id);
          if (account) return rootGetters['accounts/getName'](account);
        }
        return '';
      },
      getAddress: ({ names }) => (id) => {
        if (Crypto.isAddressValid(id)) return id;
        store.dispatch('names/fetch', id);
        if (names[id].address) return names[id].address;
        return '';
      },
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
      }, id) {
        if (state.names[id]) return;
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
      async fetchOwned({ rootState, commit }) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        const [names, bids] = await Promise.all([
          (await Promise.all(rootState.accounts.list.map(({ address }) => Promise.all([
            sdk.api.getPendingAccountTransactionsByPubkey(address)
              .then(({ transactions }) => transactions
                .filter(({ tx: { type } }) => type === 'NameClaimTx')
                .map(({ tx, ...otherTx }) => ({
                  ...otherTx,
                  ...tx,
                  pending: true,
                  owner: tx.accountId,
                })))
              .catch((error) => {
                if (!isAccountNotFoundError(error)) {
                  handleUnknownError(error);
                }
                return [];
              }),
            sdk.middleware.getActiveNames({ owner: address }),
          ])))).flat(2),
          (await Promise.all(rootState.accounts.list
            .map(({ address }) => sdk.middleware.getNameAuctionsBidsbyAddress(address))))
            .flat()
            .filter(({ nameAuctionEntry, transaction }) => nameAuctionEntry
              .winningBid === transaction.tx.nameFee)
            .map(bid => update(
              bid,
              'transaction.tx.nameFee',
              v => BigNumber(v).shiftedBy(-MAGNITUDE),
            )),
        ]);
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
    },
  });

  store.watch((state, { currentNetwork }) => currentNetwork, () => store.commit('names/reset'));
};
