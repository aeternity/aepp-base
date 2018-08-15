import uuid from 'uuid/v4';
import { genRandomBuffer } from '../utils';

export default {
  state: {
    peerId: Buffer.from(genRandomBuffer(15)).toString('base64'),
    remoteConnected: false,
    transactionToSignByRemote: null,
    showRemoteConnectionPrompt: false,
  },

  getters: {
    addresses: (state, getters, { addresses }) => addresses,
    loggedIn: ({ remoteConnected }) => remoteConnected,
  },

  mutations: {
    setRemoteConnected(state, remoteConnected) {
      state.showRemoteConnectionPrompt = false;
      state.remoteConnected = remoteConnected;
    },
    setTransactionToSign(state, transaction) {
      state.transactionToSignByRemote = transaction;
    },
    cancelTransaction() {},
    toggleRemoteConnectionPrompt(state) {
      state.showRemoteConnectionPrompt = !state.showRemoteConnectionPrompt;
    },
  },

  actions: {
    async signTransaction({ commit }, args) {
      args.id = uuid();
      let result;
      try {
        result = await new Promise((resolve, reject) =>
          commit('setTransactionToSign', { resolve, reject, args }));
      } finally {
        commit('setTransactionToSign');
      }
      return result;
    },
  },
};
