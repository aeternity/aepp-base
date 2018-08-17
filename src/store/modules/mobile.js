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
    masterKey: null,
    hasMasterKey: false,
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
    addresses ({ accounts }) {
      return Object.keys(accounts)
    },
    loggedIn ({ masterKey, keystore, derivedKey }) {
      if (derivedKey) {
        return !!(keystore && derivedKey)
      }
      return !!masterKey
    }
  },

  mutations: {
    setMasterKey (state, masterKey) {
      state.masterKey = masterKey
    },
    setHasMasterKey (state, hasMasterKey) {
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
      state.hasMasterKey = false
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
    /**
     * The function checks SecureStorage
     * for its availability and then creates
     * and instance, where it passes it over
     * to the promise
     * @return {Promise<any>}
     */
    async initSecureStorage () {
      if (window.SecureStorage) {
        /**
         * Instantiate a new secureStorage instance
         */
        const secureStorage = new window.SecureStorage('storage', false)

        /**
         * Promise returned from init() in case secureStorage
         * run successfully!
         *
         * Catch error, in case of an error, bootstrap the
         * application with default local storage
         */
        await secureStorage.init()

        /**
         * If everything resolves, resolve with SecureStorage
         */
        return secureStorage
      } else {
        throw new Error('Not secure storage found!')
      }
    },

    /**
     * Check if the device has a security system in place
     * @param dispatch
     * @return {Promise<*>}
     */
    async isDeviceSecure ({ dispatch }) {
      /**
       * Bootstrapping secureStorage
       */
      const secureStorage = await dispatch('initSecureStorage')

      /**
       * Also check if the device is already secure, in case
       * is false, then TODO: display a notification or an error
       * message to notify user to secure the device!
       */
      const isDeviceSecure = await secureStorage.isDeviceSecure()

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
        throw new Error('The device does not have security protection!')
      }

      /**
       * Return reference of secureStorage (in case its needed)
       */
      return secureStorage
    },

    /**
     * Sets the the Master key on SecureStorage
     * @param dispatch
     * @param payload
     * @return {Promise<any>}
     */
    async setMasterKey ({ dispatch }, payload) {
      /**
       * Fetch local Storage instance
       */
      const storage = await dispatch('isDeviceSecure')

      /**
       * Set the item and check if there's any
       * errors being thrown around
       */
      await storage.setItem('keystore',
        JSON.stringify(payload, (key, value) =>
          value instanceof ArrayBuffer
            ? { type: 'ArrayBuffer', data: Array.from(new Uint8Array(value)) }
            : value))

      /**
       * Resolve async function
       */
      return undefined
    },

    /**
     * Retrieves the master key from SecureStorage
     * @param dispatch
     * @return {Promise<any>}
     */
    async getMasterKey ({dispatch}) {
      /**
       * Fetch local Storage instance
       */
      const storage = await dispatch('isDeviceSecure')

      /**
       * Fetch Key
       */
      const key = await storage.getItem('keystore')

      /**
       * Resolve with key
       */
      return JSON.parse(key, (key, value) =>
        value && value.type === 'ArrayBuffer'
          ? new Uint8Array(value.data).buffer
          : value)
    },

    /**
     * Create a master key and return its value
     * @param context
     * @param seed
     * @return {Promise<void>}
     */
    async createMasterKey ({ commit, dispatch }, seed) {
      const masterKey = generateHDWallet(mnemonicToSeed(seed))
      await dispatch('setMasterKey', masterKey)
      commit('setMasterKey', masterKey)
      commit('setHasMasterKey', true)
      return undefined
    },

    /**
     * Unlock/get Master key and commit
     * @param commit
     * @param dispatch
     * @return {Promise<undefined>}
     */
    async unlockMasterKey ({ commit, dispatch }) {
      const masterKey = await dispatch('getMasterKey')
      commit('setMasterKey', masterKey)
      return undefined
    },

    /**
     * Lock masterKey with a derived password
     * @return {Promise<void>}
     */
    async createWithPassword ({ commit, dispatch }, { seed, password }) {
      const salt = genRandomBuffer(16)
      const masterKey = generateHDWallet(mnemonicToSeed(seed))
      const derivedKey = await derivePasswordKey(password, salt)
      const aes = new AES(derivedKey)
      const mac = await aes.encrypt(new Uint8Array(2))
      const privateKey = await aes.encrypt(masterKey.privateKey)
      const chainCode = await aes.encrypt(masterKey.chainCode)

      commit('setKeystore', { privateKey, chainCode, mac, salt })
      commit('setDerivedKey', derivedKey)
      commit('resetAccountCount')
      commit('selectIdentity', 0)
    },

    /**
     * Unlock key with password derived security
     * @param state
     * @param commit
     * @param dispatch
     * @param masterKey
     * @param password
     * @return {Promise<void>}
     */
    async unlockWithPassword ({ state, commit, dispatch }, password) {
      const derivedKey = await derivePasswordKey(password, state.keystore.salt)
      const aes = new AES(derivedKey)
      await aes.decrypt(state.keystore.privateKey)
      await aes.decrypt(state.keystore.chainCode)
      const mac = new Uint8Array(await aes.decrypt(state.keystore.mac))

      if (mac.reduce((p, n) => p || n !== 0, false)) {
        throw new Error('Invalid password')
      }

      commit('setDerivedKey', derivedKey)
    },

    /**
     * TODO: Follow up on this later
     */
    async createKeystore ({ commit, dispatch }, { password, seed }) {
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
      await dispatch('setMasterKey', encryptedHdWallet)
      commit('resetAccountCount')
      commit('selectIdentity', 0)
      commit('setDerivedKey', passwordDerivedKey)
      commit('setKeystore', true)
    },
    async unlockKeystore ({ commit, state, dispatch }, password) {
      const keystore = await dispatch('getMasterKey')
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
