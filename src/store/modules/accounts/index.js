/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

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
    getColor: (state, { getModule }) => account => getModule(account).account.color,
  },

  mutations: {
    setActiveIdx(state, activeIdx) {
      state.activeIdx = activeIdx;
    },
    setName(state, name) {
      this.getters['accounts/active'].name = name;
    },
    add(state, {
      address, name, active, ...source
    }) {
      state.list.push({
        name: name || `Account #${state.list.length + 1}`,
        address,
        source,
      });
      if (active) state.activeIdx = state.list.length - 1;
    },
    remove(state, idx) {
      state.list.splice(idx, 1);
      if (state.activeIdx === state.list.length) state.activeIdx -= 1;
    },
  },

  actions: {
    sign({ getters: { active, getModule }, dispatch }, data) {
      return dispatch(`${getModule(active).name}/sign`, data);
    },

    signTransaction({ getters: { active, getModule }, dispatch }, txBase64) {
      return dispatch(`${getModule(active).name}/signTransaction`, txBase64);
    },
  },
};
