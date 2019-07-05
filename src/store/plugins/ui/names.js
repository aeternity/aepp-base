/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import { fetchMiddlewareEndpoint } from '../../utils';

export default (store) => {
  store.registerModule('names', {
    namespaced: true,
    state: { names: {} },
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
    },
    mutations: {
      set({ names }, { address, fetched, name }) {
        Vue.set(names, address, { fetched, name });
      },
      reset(state) {
        state.names = {};
      },
    },
    actions: {
      async fetch({ state, rootGetters, commit }, address) {
        if (state.names[address]) return;
        commit('set', { address, fetched: true });
        const url = new URL(
          `/middleware/names/reverse/${address}`,
          rootGetters.currentNetwork.middlewareUrl,
        );
        url.searchParams.set('limit', '1');
        url.searchParams.set('page', '1');
        const names = await fetchMiddlewareEndpoint(url);
        if (names.length) commit('set', { address, name: names[0].name });
      },
    },
  });

  store.watch((state, { currentNetwork }) => currentNetwork, () => store.commit('names/reset'));
};
