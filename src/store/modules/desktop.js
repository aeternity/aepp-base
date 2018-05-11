import uuid from 'uuid/v4'
import remoteConnection from '../plugins/remoteConnection'

export default {
  state: {
    remoteConnected: false,
    transactionIdToSignByRemote: null,
    showRemoteConnectionPrompt: false
  },

  getters: {
    addresses: (state, getters, { addresses }) => addresses,
    loggedIn: ({ remoteConnected }) => remoteConnected
  },

  mutations: {
    setRemoteConnected (state, remoteConnected) {
      state.showRemoteConnectionPrompt = false
      state.remoteConnected = remoteConnected
    },
    setTransactionIdToSignByRemote (state, transactionId) {
      state.transactionIdToSignByRemote = transactionId
    },
    toggleRemoteConnectionPrompt (state) {
      state.showRemoteConnectionPrompt = !state.showRemoteConnectionPrompt
    }
  },

  actions: {
    async signTransaction ({ commit }, args) {
      args.id = uuid()
      commit('setTransactionIdToSignByRemote', args.id)
      let result
      try {
        result = await remoteConnection.leader.call('signTransaction', args)
      } finally {
        commit('setTransactionIdToSignByRemote')
      }
      return result
    },
    async cancelTransaction ({ state: { transactionIdToSignByRemote } }) {
      remoteConnection.leader.call('cancelTransaction', transactionIdToSignByRemote)
    }
  }
}
