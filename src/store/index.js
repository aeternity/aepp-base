import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { appsRegistry } from '../lib/appsRegistry'
import networksRegistry from '../lib/networksRegistry'
import desktop from './modules/desktop'
import mobile from './modules/mobile'
import pollBalance from './plugins/pollBalance'
import initEpoch from './plugins/initEpoch'
import remoteConnection from './plugins/remoteConnection'
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection'
import decryptAccounts from './plugins/decryptAccounts'
import aeppApi from './plugins/aeppApi'
import { genRandomBuffer } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: [
        'peerKey',
        ...process.env.IS_MOBILE_DEVICE
          ? [
            'apps',
            'rpcUrl',
            'mobile.keystore',
            'mobile.accountCount',
            'selectedIdentityIdx',
            'addressBook',
            'mobile.followers',
            'mobile.names'
          ] : []
      ],
      setState: (key, state, storage) =>
        storage.setItem(key, JSON.stringify(state, (key, value) =>
          value instanceof ArrayBuffer
            ? { type: 'ArrayBuffer', data: Array.from(new Uint8Array(value)) }
            : value)),
      getState: (key, storage) =>
        JSON.parse(storage.getItem(key), (key, value) =>
          value && value.type === 'ArrayBuffer'
            ? new Uint8Array(value.data).buffer
            : value)
    }),
    pollBalance,
    initEpoch,
    remoteConnection,
    aeppApi,
    ...process.env.IS_MOBILE_DEVICE
      ? [decryptAccounts, notificationOnRemoteConnection] : []
  ],

  modules: process.env.IS_MOBILE_DEVICE ? { mobile } : { desktop },

  state: {
    peerKey: Buffer.from(genRandomBuffer(15)).toString('base64'),
    selectedAppIdxToRemove: -1,
    selectedIdentityIdx: 0,
    showIdManager: false,
    balances: {},
    addresses: [],
    rpcUrl: networksRegistry[0].url,
    epoch: null,
    networkId: null,
    alert: null,
    notification: null,
    apps: Object.keys(appsRegistry),
    addressBook: []
  },

  getters: {
    identities: ({ balances }, { addresses }, { mobile }) =>
      addresses.map((e, index) => ({
        balance: balances[e] || 0,
        address: e,
        name: process.env.IS_MOBILE_DEVICE ? mobile.names[index] : e.substr(0, 6)
      })),
    activeIdentity: ({ selectedIdentityIdx }, { identities }) =>
      identities[selectedIdentityIdx],
    totalBalance: (state, { identities }) =>
      identities.reduce((sum, { balance }) => sum + balance, 0)
  },

  mutations: {
    setRPCUrl (state, rpcUrl) {
      state.rpcUrl = rpcUrl
    },
    setEpoch (state, epoch) {
      state.epoch = epoch
    },
    setNetworkId (state, networkId) {
      state.networkId = networkId
    },
    addApp (state, app) {
      state.apps.push(app)
    },
    selectAppToRemove (state, selectedAppIdxToRemove = -1) {
      state.selectedAppIdxToRemove = selectedAppIdxToRemove
    },
    removeSelectedApp (state) {
      state.apps.splice(state.selectedAppIdxToRemove, 1)
      state.selectedAppIdxToRemove = -1
    },
    selectIdentity (state, selectedIdentityIdx) {
      state.selectedIdentityIdx = selectedIdentityIdx
    },
    setBalance (state, { address, balance }) {
      Vue.set(state.balances, address, balance)
    },
    setAlert (state, options) {
      state.alert = options
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
    alert ({ commit }, options) {
      return new Promise(resolve => commit('setAlert', {
        ...options,
        resolve: () => {
          commit('setAlert')
          resolve()
        }
      }))
    },
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
    async updateBalance ({ state: { epoch, balances }, commit }, address) {
      const balance = (await epoch.api.getAccountBalance(address)).balance
      if (balances[address] === balance) return
      commit('setBalance', { address, balance })
    }
  }
})

export default store
