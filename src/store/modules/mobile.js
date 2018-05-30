import Vue from 'vue'
import { keystore as Keystore, signing } from 'eth-lightwallet'
import Web3 from 'web3'
import Transaction from 'ethereumjs-tx'
import abiDecoder from 'abi-decoder'
import util from 'ethereumjs-util'
import Bluebird from 'bluebird'
import uuid from 'uuid/v4'
import AEToken from '@/assets/contracts/AEToken.json'

const { BN } = Web3.utils
Bluebird.promisifyAll(Keystore)
abiDecoder.addABI(AEToken.abi)

export default {
  state: {
    keystore: null,
    derivedKey: null,
    followers: {},
    isFollowerConnected: {},
    transactionsToApprove: {},
    messageToApprove: null
  },

  getters: {
    keystore ({ keystore: serializedKeystore }) {
      if (!serializedKeystore) return null
      const keystore = Keystore.deserialize(serializedKeystore)
      Bluebird.promisifyAll(keystore)
      return keystore
    },
    addresses: (state, { keystore }) =>
      keystore ? keystore.getAddresses() : [],
    loggedIn: ({ keystore, derivedKey }) => !!(keystore && derivedKey)
  },

  mutations: {
    setKeystore (state, keystore) {
      state.keystore = keystore
    },
    setSeed (state, seed) {
      state.seed = seed
    },
    setDerivedKey (state, derivedKey) {
      state.derivedKey = derivedKey
    },
    signOut (state) {
      state.keystore = null
      state.derivedKey = null
    },
    signTransaction (state, transaction) {
      Vue.set(state.transactionsToApprove, transaction.id, transaction)
    },
    approveTransaction (state, transactionId) {
      state.transactionsToApprove[transactionId].resolve()
      Vue.delete(state.transactionsToApprove, transactionId)
    },
    cancelTransaction (state, transactionId) {
      state.transactionsToApprove[transactionId].reject(new Error('Payment rejected by user'))
      Vue.delete(state.transactionsToApprove, transactionId)
    },
    setMessageToApprove (state, message) {
      state.messageToApprove = message
    },
    addFollower (state, follower) {
      Vue.set(state.followers, follower.key, follower)
    },
    removeFollower (state, followerKey) {
      Vue.delete(state.followers, followerKey)
    },
    followerConnected (state, followerKey) {
      Vue.set(state.isFollowerConnected, followerKey, true)
    },
    followerDisconnected (state, followerKey) {
      Vue.delete(state.isFollowerConnected, followerKey)
      Vue.set(state.followers[followerKey], 'disconnectedAt', Date.now())
    }
  },

  actions: {
    async createKeystore ({ commit, dispatch, state }, password) {
      const keystore = await Keystore.createVaultAsync({
        password: password,
        seedPhrase: state.seed,
        hdPathString: "m/44'/60'/0'/0"
      })
      Bluebird.promisifyAll(keystore)
      const derivedKey = await keystore.keyFromPasswordAsync(password)
      keystore.generateNewAddress(derivedKey, 1)
      commit('selectIdentity', 0)
      commit('setKeystore', keystore.serialize())
      commit('setDerivedKey', derivedKey)
    },
    createIdentity ({ getters: { keystore }, state: { derivedKey }, commit }) {
      keystore.generateNewAddress(derivedKey, 1)
      commit('setKeystore', keystore.serialize())
    },
    async signTransaction (
      { state: { derivedKey }, getters: { web3, keystore, tokenContract }, commit },
      { tx, appName, id = uuid() }
    ) {
      const { to, data } = tx
      const aeTokenTx = tokenContract && to.toLowerCase() === tokenContract._address.toLowerCase()
        ? abiDecoder.decodeMethod(data) : null

      tx.gas = tx.gas || await web3.eth.estimateGas(tx)
      tx.gasPrice = tx.gasPrice || new BN(await web3.eth.getGasPrice())

      await new Promise((resolve, reject) =>
        commit('signTransaction', {
          transaction: tx,
          appName,
          aeTokenTx,
          resolve,
          reject,
          id
        }))
      tx.nonce = tx.nonce || await web3.eth.getTransactionCount(tx.from)
      const t = new Transaction(tx)
      return signing.signTx(keystore, derivedKey, t.serialize().toString('hex'), tx.from)
    },
    async signPersonalMessage ({ getters, state: { derivedKey }, commit }, { msg, appName }) {
      const data = getters.web3.toAscii(msg.data)
      await new Promise((resolve, reject) =>
        commit('setMessageToApprove', { message: data, appName, resolve, reject }))
      const messageHash = util.hashPersonalMessage(util.toBuffer(data))
      const privateKey = getters.keystore.exportPrivateKey(util.stripHexPrefix(msg.from), derivedKey)
      const signed = util.ecsign(messageHash, new Buffer(privateKey, 'hex'))
      const combined = Buffer.concat([
        Buffer.from(signed.r),
        Buffer.from(signed.s),
        Buffer.from([signed.v])
      ])
      // TODO confirm screen like in signTransaction
      return util.addHexPrefix(combined.toString('hex'))
    }
  }
}
