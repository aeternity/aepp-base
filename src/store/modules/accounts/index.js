import airGap from './airGap';
import hdWallet from './hdWallet';
import hdWalletRemote from './hdWalletRemote';
import ledger from './ledger';

const modules = {
  airGap,
  hdWallet,
  hdWalletRemote,
  ledger,
};

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
    getByType:
      ({ list }) =>
      (type) =>
        list.filter(({ source }) => source.type === type),
    getModule:
      () =>
      ({ source: { type } }) => {
        const [name, module] =
          Object.entries(modules).find(([, { account }]) => account.type === type) ||
          (() => {
            throw new Error(`Unknown account type: ${type}`);
          })();
        return { ...module, name };
      },
    getColor:
      (state, { getModule }) =>
      (account) =>
        getModule(account).account.color,
    getName:
      (state, { getModule, getByType }, rootState, rootGetters) =>
      (account) =>
        rootGetters['names/get'](account.address, false) ||
        [
          getModule(account).account.getTypeVerbose(),
          ' #',
          getByType(account.source.type).findIndex(({ address }) => address === account.address) +
            1,
        ].join(''),
  },

  mutations: {
    setActiveIdx(state, activeIdx) {
      state.activeIdx = activeIdx;
    },
    add(state, { address, active, ...source }) {
      state.list.push({ address, source });
      if (active) state.activeIdx = state.list.length - 1;
    },
    remove(state, idx) {
      state.list.splice(idx, 1);
      if (state.activeIdx === state.list.length) state.activeIdx -= 1;
    },
  },

  actions: {
    setActiveIdx({ commit, state }, activeIdx) {
      if (state.activeIdx === activeIdx) return;
      commit('setActiveIdx', activeIdx);
    },

    sign({ getters: { active, getModule }, dispatch }, { data, signal }) {
      return dispatch(`${getModule(active).name}/sign`, { data, signal });
    },

    signTransaction({ getters: { active, getModule }, dispatch }, { transaction, signal }) {
      return dispatch(`${getModule(active).name}/signTransaction`, { transaction, signal });
    },
  },
};
