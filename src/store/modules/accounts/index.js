/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { camelCase, unionBy } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';
import { fetchJson, mapKeysDeep } from '../../utils';
import airGap from './airGap';
import hdWallet from './hdWallet';
import ledger from './ledger';

const modules = { airGap, hdWallet, ledger };

export default {
  namespaced: true,
  modules,

  state: {
    list: [],
    activeIdx: 0,
  },

  getters: {
    active: ({ list, activeIdx }) => list[activeIdx],
    activeColor: (state, { getColor, active }) => getColor(active),
    getByType: ({ list }) => type => list.filter(({ source }) => source.type === type),
    getModule: () => ({ source: { type } }) => {
      const [name, module] = Object.entries(modules)
        .find(([, { account }]) => account.type === type)
        || (() => { throw new Error(`Unknown account type: ${type}`); })();
      return { ...module, name };
    },
    getColor: (stage, { getModule }) => account => getModule(account).account.color,
  },

  mutations: {
    setActiveIdx(state, activeIdx) {
      state.activeIdx = activeIdx;
    },
    setName(state, name) {
      this.getters['accounts/active'].name = name;
    },
    setTransactions(state, transactions) {
      this.getters['accounts/active'].transactions = unionBy(
        this.getters['accounts/active'].transactions || [], transactions, 'hash',
      );
    },
    add(state, {
      address, name, active, ...source
    }) {
      state.list.push({
        name: name || `Account #${state.list.length + 1}`,
        address,
        source,
        transactions: [],
      });
      if (active) state.activeIdx = state.list.length - 1;
    },
  },

  actions: {
    normalizeTransaction: async ({ rootState: { sdk }, getters: { active: { address } } }, {
      blockHash, time, tx: { amount, fee, ...otherTx }, ...otherTransaction
    }) => ({
      ...otherTransaction,
      time: new Date(time || (await sdk.api.getMicroBlockHeaderByHash(blockHash)).time),
      received: address === otherTx.recipientId,
      peerId: address === otherTx.recipientId
        ? otherTx.senderId
        : otherTx.recipientId,
      tx: {
        ...otherTx,
        amount: BigNumber(amount).shiftedBy(-MAGNITUDE),
        fee: BigNumber(fee).shiftedBy(-MAGNITUDE),
      },
    }),

    async updateTransactions({
      rootState: { sdk }, getters, rootGetters, commit, dispatch,
    }) {
      const { active: { address } } = getters;
      const { currentNetwork: { middlewareUrl } } = rootGetters;
      const transactions = await Promise.all([
        ...mapKeysDeep(
          (await fetchJson(
            `${middlewareUrl}/middleware/transactions/account/${address}`,
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
      commit('setTransactions', transactions);
    },

    async fetchTransaction({
      rootState: { sdk }, getters: { active }, commit, dispatch,
    }, hash) {
      if (active.transactions.find(t => t.hash === hash)) return;
      const transaction = await dispatch('normalizeTransaction',
        await sdk.api.getTransactionByHash(hash));
      commit('setTransactions', [transaction]);
    },

    sign({ getters: { active, getModule }, dispatch }, data) {
      return dispatch(`${getModule(active).name}/sign`, data);
    },

    signTransaction({ getters: { active, getModule }, dispatch }, txBase64) {
      return dispatch(`${getModule(active).name}/signTransaction`, txBase64);
    },
  },
};
