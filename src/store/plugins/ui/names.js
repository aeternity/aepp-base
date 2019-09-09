/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import { handleUnknownError, isAccountNotFoundError } from '../../../lib/utils';
import { AENS_DOMAIN } from '../../../lib/constants';

const removeDomain = name => name.replace(AENS_DOMAIN, '');

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
      async fetch({ rootState, state, commit }, address) {
        if (state.names[address]) return;
        commit('set', { address });
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        const names = await sdk.middleware
          .getActiveNames({ owner: address, limit: 1, page: 1 });
        if (names.length) commit('set', { address, name: removeDomain(names[0].name) });
      },
      async fetchOwned({ rootState, commit }) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        commit(
          'setOwned',
          (await Promise.all(rootState.accounts.list.map(async ({ address }) => {
            const names = (await Promise.all([
              (async () => (await sdk.api.getPendingAccountTransactionsByPubkey(address)
                .catch((error) => {
                  if (!isAccountNotFoundError(error)) {
                    handleUnknownError(error);
                  }
                  return { transactions: [] };
                }))
                .transactions
                .filter(({ tx: { type } }) => type === 'NameClaimTx')
                .map(({ tx, ...otherTx }) => ({
                  ...otherTx,
                  ...tx,
                  pending: true,
                  owner: tx.accountId,
                })))(),
              sdk.middleware.getActiveNames({ owner: address }),
            ]))
              .flat()
              .map(({ name, ...other }) => ({ ...other, name: removeDomain(name) }));

            commit('set', {
              address,
              ...names.length && { name: names[0].name },
            });
            return names;
          }))).flat(),
        );
      },
      async fetchName({ rootState, commit }, name) {
        const height = await new Promise((resolve) => {
          const subscription = rootState.observables.topBlockHeight.subscribe((h) => {
            if (h === 0) return;
            resolve(h);
            subscription.unsubscribe();
          });
        });
        const { owner: address } = (await rootState.sdk.middleware
          .namesSearchGet(name + AENS_DOMAIN))
          .filter(({ expiresAt }) => expiresAt > height)
          .find(nameDetails => nameDetails.name === name);
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
