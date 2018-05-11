import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Web3 from 'web3'
import _ from 'lodash'
import uuid from 'uuid/v4'
import AEToken from '@/assets/contracts/AEToken.json'
import { appsRegistry } from '@/lib/appsRegistry'
import IS_MOBILE_DEVICE from '@/lib/isMobileDevice'
import desktop from './modules/desktop'
import mobile from './modules/mobile'
import pollBalance from './plugins/pollBalance'
import setNetworkId from './plugins/setNetworkId'
import remoteConnection from './plugins/remoteConnection'
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection'

const { BN } = Web3.utils
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: [
        'peerKey',
        ...IS_MOBILE_DEVICE
          ? [
            'apps',
            'rpcUrl',
            'mobile.keystore',
            'selectedIdentityIdx',
            'addressBook',
            'mobile.followers'
          ] : []
      ]
    }),
    pollBalance,
    setNetworkId,
    remoteConnection.plugin,
    notificationOnRemoteConnection
  ],

  modules: IS_MOBILE_DEVICE ? { mobile } : { desktop },

  state: {
    peerKey: uuid(),
    selectedIdentityIdx: 0,
    showIdManager: false,
    balances: {},
    addresses: [],
    rpcUrl: 'https://kovan.infura.io',
    networkId: null,
    notification: null,
    apps: Object.keys(appsRegistry),
    addressBook: []
  },

  getters: {
    web3 ({ rpcUrl }) {
      return new Web3(rpcUrl)
    },
    tokenContract ({ networkId }, { web3 }) {
      if (!networkId || !AEToken.networks[networkId]) return null
      return new web3.eth.Contract(AEToken.abi, AEToken.networks[networkId].address)
    },
    identities: ({ balances }, { addresses }) =>
      addresses.map(e => ({
        ...balances[e] || { balance: new BN(), tokenBalance: new BN() },
        address: e,
        name: e.substr(0, 6)
      })),
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
    updateAllBalances ({ getters: { addresses }, dispatch }) {
      addresses.forEach(address => dispatch('updateBalance', address))
    },
    async updateBalance ({ state, getters: { web3, tokenContract }, commit }, address) {
      const [balance, tokenBalance] = (await Promise.all([
        web3.eth.getBalance(address),
        tokenContract ? tokenContract.methods.balanceOf(address).call() : 0
      ])).map(Web3.utils.toBN)
      if (_.isEqual(state.balances[address], { balance, tokenBalance })) return
      commit('setBalance', { address, balance, tokenBalance })
    }
  }
})

export default store
