import Vue from 'vue'
import uuid from 'uuid/v4'
import { Crypto } from '@aeternity/aepp-sdk'
import { mnemonicToSeed } from '@aeternity/bip39'
import { generateHDWallet } from '@aeternity/hd-wallet'
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
    derivedKey: null,
    hasMasterKey: false,
    keystore: null,
    accountCount: 0,
    accounts: {},
    followers: {},
    isFollowerConnected: {},
    transactionsToApprove: {},
    messageToApprove: null,
    names: []
  },

  getters: {
    addresses: ({ accounts }) => Object.keys(accounts),
    loggedIn: ({ keystore, derivedKey }) => !!(keystore && derivedKey)
  },

  mutations: {
    hasMasterKey (state, hasMasterKey) {
      state.hasMasterKey = hasMasterKey
    },
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
    /**
     * The function checks SecureStorage
     * for its availability and then creates
     * and instance, where it passes it over
     * to the promise
     * @return {Promise<any>}
     */
    isSecure () {
      return new Promise((resolve, reject) => {
        if (window.SecureStorage) {
          /**
           * Instantiate a new secureStorage instance
           */
          const secureStorage = new window.SecureStorage('storage', false)

          /**
           * Initialize secureStorage asynchronously
           */
          return secureStorage
            .init()
            /**
             * Promise returned from init() in case secureStorage
             * run successfully!
             *
             * Also check if the device is already secure, in case
             * is false, then TODO: display a notification or an error
             * message to notify user to secure the device!
             */
            .then(() => secureStorage.isDeviceSecure().then((isDeviceSecure) => {
              /**
               * Reply with some kind of message to the user
               * in case the device is not secure.
               *
               * Best approach for this would be to tell user to go
               * to "settings" page and enable the secureDevice
               * which will in turn redirect user to the phone settings
               * where he will have to setup either:
               * - finger print
               * - pass/pin code
               */
              if (!isDeviceSecure) {
                return reject(new Error('The device does not have security protection!'))
              }

              /**
               * Initialize the app with secureStorage instance
               */
              return resolve(secureStorage)
            }))
            /**
             * Catch error, in case of an error, bootstrap the
             * application with default local storage
             */
            .catch(() => reject(new Error('The secure storage, could not be initialized!')))
        }

        /**
         * Reject promise for not secure
         */
        return reject(new Error('Not secure storage found!'))
      })
    },

    /**
     * Sets the the Master key on SecureStorage
     * @param dispatch
     * @param payload
     * @return {Promise<any>}
     */
    setMasterKey ({dispatch}, payload) {
      return new Promise((resolve, reject) => {
        return dispatch('isSecure').then((storage) => {
          return storage.setItem('keystore',
            JSON.stringify(payload, (key, value) =>
              value instanceof ArrayBuffer
                ? { type: 'ArrayBuffer', data: Array.from(new Uint8Array(value)) }
                : value)).then(resolve)
        }).catch(reject)
      })
    },

    /**
     * Retrieves the master key from SecureStorage
     * @param dispatch
     * @return {Promise<any>}
     */
    getMasterKey ({dispatch}) {
      return new Promise((resolve, reject) => {
        return dispatch('isSecure').then((storage) => {
          return storage.getItem('keystore').then((item) => resolve(
            JSON.parse(item, (key, value) =>
              value && value.type === 'ArrayBuffer'
                ? new Uint8Array(value.data).buffer
                : value)
          ))
        }).catch(reject)
      })
    },

    async createKeystore ({ commit, state: { seed }, dispatch }, password) {
      const salt = new ArrayBuffer(16)
      window.crypto.getRandomValues(new Uint8Array(salt))
      const passwordDerivedKey = await derivePasswordKey(password, salt)
      const aes = new AES(passwordDerivedKey)
      const hdWallet = generateHDWallet(mnemonicToSeed(seed))
      const mac = await aes.encrypt(new Uint8Array(2))
      const encryptedHdWallet = {
        privateKey: await aes.encrypt(hdWallet.privateKey),
        chainCode: await aes.encrypt(hdWallet.chainCode),
        mac,
        salt
      }

      dispatch('setMasterKey', {...hdWallet, mac, salt}).then(() => {
        commit('clearSeed')
        commit('resetAccountCount')
        commit('selectIdentity', 0)
        commit('setKeystore', encryptedHdWallet)
        commit('setDerivedKey', passwordDerivedKey)
        commit('hasMasterKey', true)
      })
    },
    async unlockKeystore ({ commit, dispatch }, password) {
      const keystore = await dispatch('getMasterKey')
      const passwordDerivedKey = await derivePasswordKey(password, keystore.salt)
      const aes = new AES(passwordDerivedKey)
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
