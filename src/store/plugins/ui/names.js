import Vue from 'vue';
import { isAddressValid, Name, produceNameId } from '@aeternity/aepp-sdk';
import { getAddressByNameEntry, isAensName } from '../../../lib/utils';

export default (store) => {
  store.registerModule('names', {
    namespaced: true,
    state: {
      names: {},
      defaults: store.state.names?.defaults ?? {},
      owned: [],
    },
    getters: {
      get: ({ names }, { getDefault }, rootState, rootGetters) => (id, local = true) => {
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
          const account = rootState.accounts.list.find((a) => a.address === id);
          if (account) return rootGetters['accounts/getName'](account);
        }
        return '';
      },
      getAddress: ({ names }) => (id) => {
        if (isAddressValid(id)) return id;
        store.dispatch('names/fetch', { id });
        if (names[id].address) return names[id].address;
        return '';
      },
      getDefault: ({ defaults }, _getters, { sdkSync: { networkId } }) => (address) => (
        defaults[`${address}-${networkId}`]
      ),
    },
    mutations: {
      set({ names }, {
        key, address, name, hash,
      }) {
        const entry = { address, name, hash };
        [key, address, hash, name]
          .filter((k) => k)
          .forEach((k) => Vue.set(names, k, entry));
      },
      setOwned(state, owned) {
        state.owned = owned;
      },
      setDefault({ defaults }, { address, networkId, name }) {
        Vue.set(defaults, `${address}-${networkId}`, name);
      },
      reset(state) {
        state.names = {};
        state.owned = [];
      },
    },
    actions: {
      async getHeight({ rootState }) {
        let subscription;
        const height = await new Promise((resolve) => {
          subscription = rootState.observables
            .topBlockHeight.subscribe((h) => h !== 0 && resolve(h));
        });
        subscription.unsubscribe();
        return height;
      },
      async fetch({ rootGetters: { node, middleware }, state, commit }, { id, force }) {
        if (!force && state.names[id]) return;
        commit('set', { key: id });
        if (id.startsWith('ak_')) {
          const nameEntry = (await middleware.getAccountPointees(id, { limit: 100 }))
            .data.find(({ active, key }) => active && key === 'account_pubkey');
          if (!nameEntry) return;
          commit('set', {
            address: id,
            name: nameEntry.name,
            hash: produceNameId(nameEntry.name),
          });
          return;
        }
        if (id.startsWith('nm_')) {
          const entry = await middleware.getName(id);
          if (!entry.active) return;
          const { name, hash } = entry;
          commit('set', { address: getAddressByNameEntry(entry), name, hash });
          return;
        }
        if (isAensName(id)) {
          const nameEntry = await node.getNameEntryByName(id);
          commit('set', {
            address: getAddressByNameEntry(nameEntry),
            name: id,
            hash: nameEntry.id,
          });
          return;
        }
        throw new Error(`Unknown id: ${id}`);
      },
      async fetchOwned({ rootState, rootGetters: { node, middleware }, commit }) {
        /**
         * Name object structure
         * @property {string} name - name ending with .chain
         * @property {string} owner - address
         * @property {array} pointers - array of objects with key and value
         * @property {number | undefined} activeFrom - block height
         * @property {number | undefined} expireHeight - block height
         * @property {'auction' | 'name'} status
         * @property {BigNumber | undefined} nameFee
         */
        const names = (await Promise.all(
          rootState.accounts.list.map(({ address }) =>
            middleware.getNames({ ownedBy: address, limit: 100, state: 'active' })
              .then(({ data }) => data.map(({ name, pointers, activeFrom, expireHeight }) => ({
                name,
                owner: address,
                pointers: Object.values(pointers), // TODO: remove after updating sdk to 14.1.0
                activeFrom,
                expireHeight,
                status: 'name',
              })))),
        )).flat(1);

        commit('setOwned', names);
      },
      async setDefault({ rootGetters: { node }, commit }, { name, address }) {
        commit('setDefault', { name, address, networkId: await node.getNetworkId() });
      },
      async updatePointer({
        rootGetters, state, commit, dispatch,
      }, { name, address }) {
        const nameEntry = await rootGetters.node.getNameEntryByName(name);
        await (new Name(name, rootGetters.sdk.getContext())).update(
          address ? { account_pubkey: address } : {},
          { extendPointers: true },
        );
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
