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
import { logTx } from '@/lib/logging'
import { getEstimatedGas, getGasPrice } from '@/lib/remoteGetters'

Vue.use(Vuex)
Bluebird.promisifyAll(Keystore)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['apps', 'rpcUrl', 'keystore', 'selectedIdentityIdx']
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
    apps: [{
      name: 'Notary',
      icon: 'static/icons/notary.svg',
      path: `${process.env.IS_STAGE ? 'stage-' : ''}notary.aepps.com`
    }, {
      name: 'Transfer',
      icon: 'static/icons/notary.svg',
      path: 'transfer'
    }, {
      name: 'Wall',
      icon: 'static/icons/wall.svg',
      path: 'wall.aepps.com'
    }, {
      name: 'Network',
      icon: 'static/icons/notary.svg',
      path: 'network'
    }]
  },

  getters: {
    keystore ({ keystore: serializedKeystore }) {
      if (!serializedKeystore) return null
      const keystore = Keystore.deserialize(serializedKeystore)
      Bluebird.promisifyAll(keystore)
      return keystore
    },
    web3 ({ derivedKey, rpcUrl }, { keystore }) {
      const web3 = new Web3(new ZeroClientProvider({
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
      Bluebird.promisifyAll(web3.eth)
      Bluebird.promisifyAll(web3.version)
      return web3
    },
    tokenContract ({ networkId }, { web3 }) {
      if (!networkId || !AEToken.networks[networkId]) return null
      const contract = web3.eth.contract(AEToken.abi)
        .at(AEToken.networks[networkId].address)
      Bluebird.promisifyAll(contract)
      return contract
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
    updateRPC (state, rpcUrl) {
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
    }
  },

  actions: {
    setNotification ({ commit }, options) {
      commit('setNotification', options)
      if (options.autoClose) setTimeout(() => commit('setNotification'), 3000)
    },
    async addApp ({ commit }, path) {
      let title
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/' + path)
        const text = await response.text()
        const el = document.createElement('html')
        el.innerHTML = text
        title = el.getElementsByTagName('title')[0].innerText
      } finally {
        title = title || prompt('Enter Title')
        if (title) {
          commit('addApp', {
            name: title,
            icon: 'static/icons/notary.svg',
            path
          })
        }
      }
    },
    updateAllBalances ({getters, dispatch}) {
      getters.keystore.getAddresses().forEach(address =>
        dispatch('updateBalance', address))
    },
    async updateBalance ({getters: { web3, tokenContract }, commit}, address) {
      const [balance, tokenBalance] = await Promise.all([
        web3.eth.getBalanceAsync(address),
        tokenContract ? tokenContract.balanceOfAsync(address, {}) : NaN
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
      { state: { derivedKey, tokenAddress }, getters: { web3, keystore } }, { tx, appName }
    ) {
      const to = tx.to ? web3.toHex(tx.to).toLowerCase() : null
      const isAeTokenTx = to === tokenAddress
      logTx(tx, tokenAddress)

      let aeTokenTx = {}

      tx.gas = tx.gas || await web3.eth.estimateGasAsync(tx)

      if (isAeTokenTx) {
        let data = tx.data ? tx.data : null // data sent to contract
        // it is a call to our token contract
        abiDecoder.addABI(AEToken.abi)
        const decodedData = abiDecoder.decodeMethod(data)
        if (decodedData) {
          console.log('decodedData', JSON.stringify(decodedData))
          let method = decodedData.name
          // e.g. callAndApprove, transfer, ...
          // let params = decodedData.params
          // e.g. [{"name":"_spender","value":"0x000....","type":"address"},{"name":"_value","value":"1000000000000000000","type":"uint256"}]
          // methods which transfer tokens or allow transferring of tokens are:
          // approve(_spender, _value)
          // transferFrom(_from, _to, _value)
          // transfer(_to, _value)
          // approveAndCall(_spender, _value, _data)
          if (method === 'approveAndCall' || method === 'approve' || method === 'transfer') {
            // let value = web3.toBigNumber(params.find(param => param.name === '_value').value)
            // confirmMessage += ' which transfers ' + web3.fromWei(value, 'ether') + ' Æ-Token'
          }
          aeTokenTx = decodedData
        } else {
          console.log('could not decode data')
        }
      }

      const approved = await approveTransactionDialog(
        tx,
        getEstimatedGas.bind(undefined, web3, tx),
        getGasPrice.bind(undefined, web3),
        appName,
        isAeTokenTx,
        aeTokenTx
      )
      if (!approved) {
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
  async web3 => store.commit('setNetworkId', await web3.version.getNetworkAsync()),
  { immediate: true })

export default store
