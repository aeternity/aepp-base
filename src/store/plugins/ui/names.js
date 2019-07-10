/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import { uniqBy } from 'lodash-es';
import { fetchMiddlewareEndpoint } from '../../utils';

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
      async fetch({ state, rootGetters, commit }, address) {
        if (state.names[address]) return;
        commit('set', { address });
        const url = new URL(
          `/middleware/names/reverse/${address}`,
          rootGetters.currentNetwork.middlewareUrl,
        );
        url.searchParams.set('limit', '1');
        url.searchParams.set('page', '1');
        const names = await fetchMiddlewareEndpoint(url);
        if (names.length) commit('set', { address, name: names[0].name });
      },
      async fetchOwned({ rootState, rootGetters, commit }) {
        commit(
          'setOwned',
          (await Promise.all(rootState.accounts.list.map(async ({ address }) => {
            const names = (await Promise.all([
              (async () => {
                if (rootState.sdk.then) await rootState.sdk;
                return (await rootState.sdk.api.getPendingAccountTransactionsByPubkey(address)
                  .catch(() => ({ transactions: [] })))
                  .transactions
                  .filter(({ tx: { type } }) => type === 'NameClaimTx')
                  .map(({ tx, ...otherTx }) => ({
                    ...otherTx,
                    ...tx,
                    pending: true,
                    owner: tx.accountId,
                  }));
              })(),
              (async () => uniqBy(
                await fetchMiddlewareEndpoint(new URL(
                  `/middleware/names/reverse/${address}`,
                  rootGetters.currentNetwork.middlewareUrl,
                )),
                'name',
              ))(),
            ])).flat();

            commit('set', {
              address,
              ...names.length && { name: names[0].name },
            });
            return names;
          }))).flat(),
        );
      },
    },
  });

  store.watch((state, { currentNetwork }) => currentNetwork, () => store.commit('names/reset'));
};
