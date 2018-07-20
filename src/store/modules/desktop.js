import uuid from 'uuid/v4'
import nacl from 'tweetnacl'
import { getPeerIdByKey } from '../utils'

export default {
  state: {
    remoteConnected: false,
    remoteConnectionPrivateKey: nacl.box.keyPair().secretKey.buffer,
    transactionToSignByRemote: null,
    showRemoteConnectionPrompt: false
  },

  getters: {
    addresses: (state, getters, { addresses }) => addresses,
    loggedIn: ({ remoteConnected }) => remoteConnected,
    remoteConnectionPublicKey: ({ remoteConnectionPrivateKey }) =>
      nacl.box.keyPair.fromSecretKey(
        new Uint8Array(remoteConnectionPrivateKey)).publicKey.buffer,
    peerId: (state, { remoteConnectionPublicKey }) =>
      getPeerIdByKey(remoteConnectionPublicKey)
  },

  mutations: {
    setRemoteConnected (state, remoteConnected) {
      state.showRemoteConnectionPrompt = false
      state.remoteConnected = remoteConnected
    },
    setTransactionToSign (state, transaction) {
      state.transactionToSignByRemote = transaction
    },
    cancelTransaction () {},
    toggleRemoteConnectionPrompt (state) {
      state.showRemoteConnectionPrompt = !state.showRemoteConnectionPrompt
    }
  },

  actions: {
    async signTransaction ({ commit }, args) {
      args.id = uuid()
      let result
      try {
        result = await new Promise((resolve, reject) =>
          commit('setTransactionToSign', { resolve, reject, args }))
      } finally {
        commit('setTransactionToSign')
      }
      return result
    }
  }
}
