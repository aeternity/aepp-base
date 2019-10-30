/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import {
  handleUnknownError, isAccountNotFoundError, removeTopDomain, getAensDomain, getAddressByNameEntry,
} from '../../../lib/utils';

export default (store) => {
  store.registerModule('names', {
    namespaced: true,
    state: {
      names: {},
      owned: [],
    },
    getters: {
      get: ({ names }, getters, { accounts: { list } }, rootGetters) => (address, local = true) => {
        store.dispatch('names/fetch', address);
        if (names[address].name) return names[address].name;
        if (local) {
          const account = list.find(a => a.address === address);
          if (account) return rootGetters['accounts/getName'](account);
        }
        return '';
      },
      isPending: ({ owned }) => name => !!(owned.find(t => t.name === name) || {}).pending,
    },
    mutations: {
      set({ names }, { address, name }) {
        Vue.set(names, address, { name });
      },
      setOwned(state, owned) {
        state.owned = owned;
      },
      reset(state) {
        state.names = {};
        state.owned = [];
      },
    },
    actions: {
      getHeight({ rootState }) {
        return new Promise((resolve) => {
          const subscription = rootState.observables.topBlockHeight.subscribe((h) => {
            if (h === 0) return;
            resolve(h);
            subscription.unsubscribe();
          });
        });
      },
      async fetch({
        rootState, state, commit, dispatch,
      }, address) {
        if (state.names[address]) return;
        commit('set', { address });
        const height = await dispatch('getHeight');
        const names = (await rootState.sdk.middleware
          .getNameByAddress(address))
          .filter(({ expiresAt }) => expiresAt > height);
        if (names.length) commit('set', { address, name: removeTopDomain(names[0].name) });
      },
      async fetchOwned({ rootState, commit }) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        commit(
          'setOwned',
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
          ]))))
            .flat(2)
            .map(({ name, ...other }) => ({ ...other, name: removeTopDomain(name) })),
        );
      },
      async fetchName({ rootState, commit }, name) {
        const address = getAddressByNameEntry(
          await rootState.sdk.api
            .getNameEntryByName(name + getAensDomain(rootState.sdk.getNodeInfo())),
        );
        commit('set', { address, name });
        return address;
      },
      async getAddressByName({ state, dispatch }, name) {
        return (
          Object.entries(state.names).find(([, value]) => value.name === name) || {}
        ).key || dispatch('fetchName', name);
      },
    },
  });

  store.watch((state, { currentNetwork }) => currentNetwork, () => store.commit('names/reset'));
};
