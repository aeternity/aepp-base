import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { keystore as Keystore, signing } from 'eth-lightwallet'
import Web3 from 'web3'
import Transaction from 'ethereumjs-tx'
import abiDecoder from 'abi-decoder'
import util from 'ethereumjs-util'
import Bluebird from 'bluebird'
import _ from 'lodash'
import AEToken from '@/assets/contracts/AEToken.json'
import { appsRegistry } from '@/lib/appsRegistry'

const { BN } = Web3.utils
Vue.use(Vuex)
Bluebird.promisifyAll(Keystore)
abiDecoder.addABI(AEToken.abi)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['apps', 'rpcUrl', 'keystore', 'selectedIdentityIdx', 'addressBook']
    })
  ],

  state: {
    selectedIdentityIdx: 0,
    showIdManager: false,
    balances: {},
    rpcUrl: 'https://kovan.infura.io',
    keystore: null,
    derivedKey: null,
    networkId: null,
    notification: null,
    apps: Object.keys(appsRegistry),
    addressBook: [],
    transactionToApprove: null,
    messageToApprove: null
  },

  getters: {
    keystore ({ keystore: serializedKeystore }) {
      if (!serializedKeystore) return null
      const keystore = Keystore.deserialize(serializedKeystore)
      Bluebird.promisifyAll(keystore)
      return keystore
    },
    web3 ({ rpcUrl }) {
      return new Web3(rpcUrl)
    },
    tokenContract ({ networkId }, { web3 }) {
      if (!networkId || !AEToken.networks[networkId]) return null
      return new web3.eth.Contract(AEToken.abi, AEToken.networks[networkId].address)
    },
    identities: ({ balances }, { keystore }) =>
      keystore
        ? keystore.getAddresses().map(e => ({
          ...balances[e] || { balance: new BN(), tokenBalance: new BN() },
          address: e,
          name: e.substr(0, 6)
        }))
        : [],
    activeIdentity: ({ selectedIdentityIdx }, { identities }) =>
      identities[selectedIdentityIdx],
    totalBalance: (state, { identities }) =>
      identities.reduce(
        (p, identity) => ({
          balance: p.balance.add(identity.balance),
          tokenBalance: p.tokenBalance.add(identity.tokenBalance)
        }),
        { balance: new BN(), tokenBalance: new BN() })
  },

  mutations: {
    setRPCUrl (state, rpcUrl) {
      state.rpcUrl = rpcUrl
    },
    setKeystore (state, keystore) {
      state.keystore = keystore
    },
    setSeed (state, seed) {
      state.seed = seed
    },
    setDerivedKey (state, derivedKey) {
      state.derivedKey = derivedKey
    },
    setNetworkId (state, networkId) {
      state.networkId = networkId
    },
    addApp (state, app) {
      state.apps.push(app)
    },
    removeApp (state, appIndex) {
      if (appIndex > -1) {
        state.apps.splice(appIndex, 1)
      }
    },
    selectIdentity (state, selectedIdentityIdx) {
      state.selectedIdentityIdx = selectedIdentityIdx
    },
    setBalance (state, { address, balance, tokenBalance }) {
      Vue.set(state.balances, address, { balance, tokenBalance })
    },
    setNotification (state, options) {
      state.notification = options
    },
    toggleIdManager (state) {
      state.showIdManager = !state.showIdManager
    },
    addAddressBookItem (state, item) {
      state.addressBook.push(item)
    },
    setTransactionToApprove (state, transaction) {
      state.transactionToApprove = transaction
    },
    setMessageToApprove (state, message) {
      state.messageToApprove = message
    }
  },

  actions: {
    setNotification ({ commit }, options) {
      commit('setNotification', options)
      if (options.autoClose) setTimeout(() => commit('setNotification'), 3000)
    },
    async addApp ({ commit }, arg) {
      if (appsRegistry[arg]) {
        commit('addApp', arg)
        return
      }

      const path = arg.replace(/^https?:\/\//i, '')
      let name
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/' + path)
        const text = await response.text()
        const el = document.createElement('html')
        el.innerHTML = text
        name = el.getElementsByTagName('title')[0].innerText
      } catch (e) {}
      name = name || prompt('Enter Title')
      commit('addApp', { path, name })
    },
    updateAllBalances ({getters, dispatch}) {
      getters.keystore.getAddresses().forEach(address =>
        dispatch('updateBalance', address))
    },
    async updateBalance ({ state, getters: { web3, tokenContract }, commit }, address) {
      const [balance, tokenBalance] = (await Promise.all([
        web3.eth.getBalance(address),
        tokenContract ? tokenContract.methods.balanceOf(address).call() : 0
      ])).map(Web3.utils.toBN)
      if (_.isEqual(state.balances[address], { balance, tokenBalance })) return
      commit('setBalance', { address, balance, tokenBalance })
    },
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
      { state: { derivedKey }, getters: { web3, keystore, tokenContract }, commit }, { tx, appName }
    ) {
      const { to, data } = tx
      const aeTokenTx = tokenContract && to.toLowerCase() === tokenContract._address.toLowerCase()
        ? abiDecoder.decodeMethod(data) : null

      tx.gas = tx.gas || await web3.eth.estimateGas(tx)
      tx.gasPrice = tx.gasPrice || new BN(await web3.eth.getGasPrice())
      tx.nonce = tx.nonce || await web3.eth.getTransactionCount(tx.from)

      await new Promise((resolve, reject) =>
        commit('setTransactionToApprove', {
          transaction: tx,
          appName,
          aeTokenTx,
          resolve,
          reject
        }))
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
})

let interval
store.watch(
  (state, { activeIdentity }) => activeIdentity && activeIdentity.address,
  (address) => {
    clearInterval(interval)
    if (!address) return
    interval = setInterval(() =>
      store.dispatch('updateBalance', address), 3000)
  },
  { immediate: true })

store.watch(
  (state, { web3 }) => web3,
  async web3 => store.commit('setNetworkId', await web3.eth.net.getId()),
  { immediate: true })

export default store
