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
import {
  approveTransaction as approveTransactionDialog,
  approveMessage as approveMessageDialog
} from '@/dialogs/index'
import apps from '@/lib/appsRegistry'
import JsonRpcPeer from '../lib/jsonRpcPeer'
import { Pairing } from './plugins'

const pairConnection = new Pairing()

Vue.use(Vuex)
Bluebird.promisifyAll(Keystore)
abiDecoder.addABI(AEToken.abi)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: ['apps', 'rpcUrl', 'keystore', 'selectedIdentityIdx', 'addressBook', 'pairKey']
    }),
    pairConnection.plugin
  ],

  state: {
    selectedIdentityIdx: 0,
    showIdManager: false,
    accounts: [],
    balances: {},
    rpcUrl: 'https://kovan.infura.io',
    keystore: null,
    derivedKey: null,
    pairKey: null,
    pairConnected: false,
    networkId: null,
    notification: null,
    apps: [...apps],
    addressBook: [],
    waitingForConfirmation: false
  },

  getters: {
    keystore ({ keystore: serializedKeystore }) {
      if (!serializedKeystore) return null
      const keystore = Keystore.deserialize(serializedKeystore)
      Bluebird.promisifyAll(keystore)
      return keystore
    },
    accounts ({ accounts }, { keystore }) {
      return keystore ? keystore.getAddresses() : accounts
    },
    web3 ({ rpcUrl }) {
      return new Web3(rpcUrl)
    },
    tokenContract ({ networkId }, { web3 }) {
      if (!networkId || !AEToken.networks[networkId]) return null
      return new web3.eth.Contract(AEToken.abi, AEToken.networks[networkId].address)
    },
    loggedIn: ({ derivedKey, pairConnected }) => !!derivedKey || pairConnected,
    identities: ({ balances }, { accounts }) =>
      accounts.map(e => ({
        ...balances[e] || { balance: 0, tokenBalance: 0 },
        address: e,
        name: e.substr(0, 6)
      })),
    activeIdentity: ({ selectedIdentityIdx }, { identities }) =>
      identities[selectedIdentityIdx]
  },

  mutations: {
    setAccounts (state, accounts) {
      state.accounts = accounts
    },
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
    setPairKey (state, pairKey) {
      state.pairKey = pairKey
    },
    logout (state) {
      if (state.derivedKey) state.derivedKey = undefined
      else if (state.pairKey) state.pairKey = undefined
    },
    setPairConnected (state, pairConnected) {
      state.pairConnected = pairConnected
    },
    setNetworkId (state, networkId) {
      state.networkId = networkId
    },
    addApp (state, app) {
      state.apps.push(app)
    },
    removeApp (state, name) {
      const appIndex = state.apps.findIndex(app => app.name === name)
      if (appIndex > -1) {
        state.apps.splice(appIndex, 1)
      }
    },
    selectIdentity (state, selectedIdentityIdx) {
      state.selectedIdentityIdx = selectedIdentityIdx
    },
    setBalance (state, { address, balance = 0, tokenBalance = 0 }) {
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
    setWaitingForConfirmation (state, waitingForConfirmation) {
      state.waitingForConfirmation = waitingForConfirmation
    }
  },

  actions: {
    setNotification ({ commit }, options) {
      commit('setNotification', options)
      if (options.autoClose) setTimeout(() => commit('setNotification'), 3000)
    },
    async addApp ({ commit }, arg) {
      const app = typeof arg !== 'string' ? arg : {
        path: arg.replace(/^https?:\/\//i, ''),
        icon: 'static/icons/notary.svg'
      }

      if (!app.name) {
        try {
          const response = await fetch('https://cors-anywhere.herokuapp.com/' + app.path)
          const text = await response.text()
          const el = document.createElement('html')
          el.innerHTML = text
          app.name = el.getElementsByTagName('title')[0].innerText
        } catch (e) {}
        app.name = app.name || prompt('Enter Title')
      }

      commit('addApp', app)
    },
    updateAllBalances ({ state: { accounts }, dispatch }) {
      accounts.forEach(address =>
        dispatch('updateBalance', address))
    },
    async updateBalance ({ state, getters: { web3, tokenContract }, commit }, address) {
      const [balance, tokenBalance] = await Promise.all([
        web3.eth.getBalance(address),
        tokenContract ? tokenContract.methods.balanceOf(address).call() : '0'
      ])
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
    async proxyToPeer ({ getters: { keystore }, commit }, { methodName, args }) {
      commit('setWaitingForConfirmation', true)
      let result
      try {
        result = await peer.call('signTransaction', ...args)
      } finally {
        commit('setWaitingForConfirmation', false)
      }
      return result
    },
    async signTransaction (
      { state: { derivedKey }, getters: { web3, keystore, tokenContract }, dispatch },
      { tx, appName }
    ) {
      if (!keystore) {
        return await dispatch('proxyToPeer', {
          methodName: 'signTransaction',
          args: [tx, appName]
        })
      }
      const { to, data } = tx
      const aeTokenTx = tokenContract && to.toLowerCase() === tokenContract._address.toLowerCase()
        ? abiDecoder.decodeMethod(data) : null

      tx.gas = tx.gas || await web3.eth.estimateGas(tx)
      tx.gasPrice = tx.gasPrice || new web3.utils.BN(await web3.eth.getGasPrice())
      tx.nonce = tx.nonce || await web3.eth.getTransactionCount(tx.from)

      if (!await approveTransactionDialog(tx, appName, aeTokenTx)) {
        throw new Error('Payment rejected by user')
      }
      const t = new Transaction(tx)
      return `0x${signing.signTx(keystore, derivedKey, t.serialize().toString('hex'), tx.from)}`
    },
    async signPersonalMessage (
      { getters: { web3, activeIdentity, keystore }, state: { derivedKey }, dispatch },
      { msg, appName }
    ) {
      if (!keystore) {
        return await dispatch('proxyToPeer', {
          methodName: 'signPersonalMessage',
          args: [msg, appName]
        })
      }
      const data = web3.toAscii(msg.data)
      const approved = await approveMessageDialog(activeIdentity, data, appName)
      if (!approved) {
        throw new Error('Signing rejected by user')
      }
      const messageHash = util.hashPersonalMessage(util.toBuffer(data))
      const privateKey = keystore.exportPrivateKey(util.stripHexPrefix(msg.from), derivedKey)
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

const PAIR_SYNC_FIELDS = ['apps', 'rpcUrl', 'accounts', 'selectedIdentityIdx', 'addressBook']
let lastReceivedState
const peer = new JsonRpcPeer(message => pairConnection.send(message), {
  setState: (state) => {
    lastReceivedState = state
    store.replaceState({
      ..._.omit(store.state, PAIR_SYNC_FIELDS),
      ..._.cloneDeep(state)
    })
  },
  signTransaction: (tx, appName) =>
    store.dispatch('signTransaction', { tx, appName }),
  signPersonalMessage: (tx, appName) =>
    store.dispatch('signPersonalMessage', { tx, appName })
})
pairConnection.onMessage = message => peer.processMessage(message)
store.watch(
  (state, getters) =>
    PAIR_SYNC_FIELDS.reduce((p, n) => ({ ...p, [n]: getters[n] || state[n] }), {}),
  state => {
    if (store.state.pairConnected && !_.isEqual(state, lastReceivedState)) {
      peer.notification('setState', state)
      lastReceivedState = null
    }
  })
store.watch(
  ({ pairConnected }) => pairConnected,
  pairConnected =>
    pairConnected && store.getters.keystore &&
    peer.notification('setState', _.pick({ ...store.state, ...store.getters }, PAIR_SYNC_FIELDS)))

export default store
