import Vue from 'vue'
import uuid from 'uuid/v4'
import { Crypto } from '@aeternity/aepp-sdk/src'
import { mnemonicToSeed } from '@aeternity/bip39'
import { generateHDWallet } from '@aeternity/hd-wallet/src'
import AES from '../../lib/aes'
import { genRandomBuffer } from '../utils'

const derivePasswordKey = async (password, salt) => {
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'])
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 15000, hash: 'SHA-256' },
    passwordKey,
    { name: 'AES-CTR', length: 128 },
    false,
    ['encrypt', 'decrypt'])
}

export default {
  state: {
    keystore: null,
    derivedKey: null,
    accountCount: 0,
    accounts: {},
    followers: {},
    transactionsToApprove: {},
    messageToApprove: null,
    names: []
  },

  getters: {
    addresses: ({ accounts }) => Object.keys(accounts),
    loggedIn: ({ keystore, derivedKey }) => !!(keystore && derivedKey)
  },

  mutations: {
    setKeystore (state, keystore) {
      state.keystore = keystore
    },
    setDerivedKey (state, derivedKey) {
      state.derivedKey = derivedKey
    },
    resetAccountCount (state) {
      state.names = ['My First Account']
      state.accountCount = 1
    },
    createIdentity (state, name) {
      state.names.push(name)
      state.accountCount++
    },
    setAccounts (state, accounts) {
      state.accounts = accounts
        .reduce((p, n) => ({ ...p, [Crypto.getReadablePublicKey(n.publicKey)]: n }), {})
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
      Vue.set(state.followers, follower.id, follower)
    },
    removeFollower (state, followerId) {
      Vue.delete(state.followers, followerId)
    },
    followerConnected (state, followerId) {
      Vue.set(state.followers[followerId], 'connected', true)
    },
    followerDisconnected (state, followerId) {
      Vue.delete(state.followers[followerId], 'connected')
      Vue.set(state.followers[followerId], 'disconnectedAt', Date.now())
    }
  },

  actions: {
    async createKeystore ({ commit }, { password, seed }) {
      const salt = genRandomBuffer(16)
      const passwordDerivedKey = await derivePasswordKey(password, salt)
      const aes = new AES(passwordDerivedKey)
      const hdWallet = generateHDWallet(mnemonicToSeed(seed))
      const encryptedHdWallet = {
        privateKey: await aes.encrypt(hdWallet.privateKey),
        chainCode: await aes.encrypt(hdWallet.chainCode),
        mac: await aes.encrypt(new Uint8Array(2)),
        salt
      }
      commit('resetAccountCount')
      commit('selectIdentity', 0)
      commit('setKeystore', encryptedHdWallet)
      commit('setDerivedKey', passwordDerivedKey)
    },
    async unlockKeystore ({ commit, state: { keystore } }, password) {
      const passwordDerivedKey = await derivePasswordKey(password, keystore.salt)
      const aes = new AES(passwordDerivedKey)
      await aes.decrypt(keystore.privateKey)
      await aes.decrypt(keystore.chainCode)
      const mac = new Uint8Array(await aes.decrypt(keystore.mac))
      if (mac.reduce((p, n) => p || n !== 0, false)) throw new Error('Invalid password')
      commit('setDerivedKey', passwordDerivedKey)
    },
    async signTransaction (
      { state: { accounts }, commit, rootState: { epoch } },
      { transaction, appName, id = uuid() }) {
      const spendTx = (await epoch.api.postSpend(transaction)).tx
      const binaryTx = Crypto.decodeBase58Check(spendTx.split('$')[1])
      await new Promise((resolve, reject) =>
        commit('signTransaction', {
          transaction,
          appName,
          resolve,
          reject,
          id
        }))
      const signature = Crypto.sign(binaryTx, accounts[transaction.sender].secretKey)
      return Crypto.encodeTx(Crypto.prepareTx(signature, binaryTx))
    },
    async signPersonalMessage (
      { state: { accounts }, commit },
      { message, address, appName }) {
      await new Promise((resolve, reject) =>
        commit('setMessageToApprove', { message, appName, resolve, reject }))
      const signature = Crypto.signPersonalMessage(message, accounts[address].secretKey)
      return Crypto.encodeBase58Check(Buffer.from(signature))
    }
  }
}
