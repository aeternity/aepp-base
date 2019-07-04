import Vue from 'vue';
import { fetchMiddlewareEndpoint } from '../../utils';

export default store => store.registerModule('names', {
  namespaced: true,
  state: { names: {} },
  getters: {
    get: ({ names }) => (address) => {
      store.dispatch('names/fetch', address);
      return names[address].name;
    },
  },
  mutations: {
    set({ names }, { address, fetched, name }) {
      Vue.set(names, address, { fetched, name });
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
