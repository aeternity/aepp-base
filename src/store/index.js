import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import ZeroClientProvider from 'web3-provider-engine/zero'
import { keystore as Keystore, signing } from 'eth-lightwallet'
import Web3 from 'web3'
import Transaction from 'ethereumjs-tx'
import abiDecoder from 'abi-decoder'
import util from 'ethereumjs-util'
import Bluebird from 'bluebird'
import AEToken from '@/assets/contracts/AEToken.json'
import {
  approveTransaction as approveTransactionDialog,
  approveMessage as approveMessageDialog
} from '@/dialogs/index'
import apps from '@/lib/appsRegistry'

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
    apps: [...apps],
    addressBook: []
  },

  getters: {
    keystore ({ keystore: serializedKeystore }) {
      if (!serializedKeystore) return null
      const keystore = Keystore.deserialize(serializedKeystore)
      Bluebird.promisifyAll(keystore)
      return keystore
    },
    web3 ({ derivedKey, rpcUrl }, { keystore }) {
      return new Web3(new ZeroClientProvider({
        getAccounts (cb) {
          cb(null, keystore.getAddresses())
        },
        signTransaction (tx, cb) {
          const t = new Transaction(tx)
          const signed = signing.signTx(keystore, derivedKey, t.serialize().toString('hex'), tx.from)
          cb(null, '0x' + signed)
        },
        approveTransaction (tx, cb) {
          cb(null, true)
        },
        signMessage (msg, cb) {
          const signed = signing.signMsg(keystore, derivedKey, msg.data, msg.from)
          cb(null, signing.concatSig(signed))
        },
        signPersonalMessage (msg, cb) {
          const signed = signing.signMsg(keystore, derivedKey, msg.data, msg.from)
          cb(null, signing.concatSig(signed))
        },
        rpcUrl
      }))
    },
    tokenContract ({ networkId }, { web3 }) {
      if (!networkId || !AEToken.networks[networkId]) return null
      return new web3.eth.Contract(AEToken.abi, AEToken.networks[networkId].address)
    },
    identities: ({ balances }, { keystore }) =>
      keystore
        ? keystore.getAddresses().map(e => ({
          ...balances[e] || { balance: 0, tokenBalance: 0 },
          address: e,
          name: e.substr(0, 6)
        }))
        : [],
    activeIdentity: ({ selectedIdentityIdx }, { identities }) =>
      identities[selectedIdentityIdx]
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
    updateAllBalances ({getters, dispatch}) {
      getters.keystore.getAddresses().forEach(address =>
        dispatch('updateBalance', address))
    },
    async updateBalance ({getters: { web3, tokenContract }, commit}, address) {
      const [balance, tokenBalance] = await Promise.all([
        web3.eth.getBalance(address),
        tokenContract ? tokenContract.methods.balanceOf(address).call() : NaN
      ])
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
      { state: { derivedKey }, getters: { web3, keystore, tokenContract } }, { tx, appName }
    ) {
      const { to, data } = tx
      const aeTokenTx = tokenContract && to.toLowerCase() === tokenContract._address.toLowerCase()
        ? abiDecoder.decodeMethod(data) : null

      tx.gas = tx.gas || await web3.eth.estimateGas(tx)
      tx.gasPrice = tx.gasPrice || await web3.eth.getGasPrice()

      if (!await approveTransactionDialog(tx, appName, aeTokenTx)) {
        throw new Error('Payment rejected by user')
      }
      const t = new Transaction(tx)
      return signing.signTx(keystore, derivedKey, t.serialize().toString('hex'), tx.from)
    },
    async signPersonalMessage ({ getters, state: { derivedKey } }, { msg, appName }) {
      const data = getters.web3.toAscii(msg.data)
      const { activeIdentity } = getters
      const approved = await approveMessageDialog(activeIdentity, data, appName)
      if (!approved) {
        throw new Error('Signing rejected by user')
      }
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
