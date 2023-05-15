/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import { get } from 'lodash-es';
import BigNumber from 'bignumber.js';
import Vue from 'vue';
import { isAddressValid, produceNameId } from '@aeternity/aepp-sdk-next';
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
      getDefault: ({ defaults }, getters, { sdk }) => (address) => (
        sdk.then ? undefined : defaults[`${address}-${sdk.getNetworkId()}`]
      ),
      isPending: ({ owned }) => (name) => (
        !!((owned && owned.names.find((t) => t.name === name)) || {}).status === 'pending'
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
        state.owned = null;
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
      async fetch({ rootState, state, commit }, { id, force }) {
        if (!force && state.names[id]) return;
        commit('set', { key: id });
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;
        if (id.startsWith('ak_')) {
          const nameEntry = (await sdk.middleware.api.getNamePointees(id))
            .active.accountPubkey?.[0];
          if (!nameEntry) return;
          commit('set', {
            address: id,
            name: nameEntry.name,
            hash: produceNameId(nameEntry.name),
          });
          return;
        }
        if (id.startsWith('nm_')) {
          const entry = await sdk.middleware.api.getNameById(id);
          if (!entry.active) return;
          const { name, hash, info: { pointers } } = entry;
          commit('set', { address: pointers?.accountPubkey, name, hash });
          return;
        }
        if (isAensName(id)) {
          const nameEntry = await sdk.api.getNameEntryByName(id);
          commit('set', {
            address: getAddressByNameEntry(nameEntry),
            name: id,
            hash: nameEntry.id,
          });
          return;
        }
        throw new Error(`Unknown id: ${id}`);
      },
      async fetchOwned({ rootState, commit }) {
        const sdk = rootState.sdk.then ? await rootState.sdk : rootState.sdk;

        const getPendingNameClaimTransactions = (address) => sdk.api
          .getPendingAccountTransactionsByPubkey(address)
          .then(
            ({ transactions }) => transactions
              .filter(({ tx: { type } }) => type === 'NameClaimTx')
              .map(({ tx }) => ({
                name: tx.name,
                owner: address,
                pointers: [],
                status: 'pending',
                nameFee: new BigNumber(tx.nameFee).shiftedBy(-MAGNITUDE),
              })),
            (error) => {
              if (!isAccountNotFoundError(error)) handleUnknownError(error);
              return [];
            },
          );

        /**
         * Name object structure
         * @property {string} name - name ending with .chain
         * @property {string} owner - address
         * @property {array} pointers - array of objects with key and value
         * @property {number | undefined} createdAt - block height
         * @property {number | undefined} createdAtTxIdx - transaction index
         * @property {number | undefined} expiresAt - block height
         * @property {'auction' | 'name' | 'pending'} status
         * @property {BigNumber | undefined} nameFee
         */
        const names = (await Promise.all(
          rootState.accounts.list.map(({ address }) => Promise.all([
            getPendingNameClaimTransactions(address),
            sdk.middleware.api.getNamesOwnedBy(address)
              .then(({ active, topBid }) => [
                ...active.map(({ name, info }) => ({
                  name,
                  owner: address,
                  pointers: Object.entries(info.pointers).map(([key, id]) => ({
                    // TODO: find a better wrapper for mdw api
                    key: key === 'accountPubkey' ? 'account_pubkey' : key,
                    id,
                  })),
                  createdAt: info.activeFrom,
                  createdAtTxIdx: info.claims[0],
                  expiresAt: info.expireHeight,
                  status: 'name',
                })),
                ...topBid.map(({ name, info }) => ({
                  name,
                  owner: address,
                  pointers: [],
                  createdAt: info.lastBid.blockHeight,
                  createdAtTxIdx: info.lastBid.txIndex,
                  status: 'auction',
                  nameFee: new BigNumber(info.lastBid.tx.nameFee).shiftedBy(-MAGNITUDE),
                })),
              ]),
          ])),
        )).flat(2);

        commit('setOwned', {
          names: names.filter(({ status }) => status !== 'auction'),
          bids: names.filter(({ status }) => status === 'auction'),
        });
      },
      setDefault({ rootState: { sdk }, commit }, { name, address }) {
        commit('setDefault', { name, address, networkId: sdk.getNetworkId() });
      },
      async updatePointer({
        rootState: { sdk }, state, commit, dispatch,
      }, { name, address }) {
        const nameEntry = await sdk.api.getNameEntryByName(name);
        await sdk.aensUpdate(
          name,
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
