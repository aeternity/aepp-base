import Vue from 'vue'
import Vuex from 'vuex'
import aeAbi from '../abi/aeternity-token-abi.json'
import BigNumber from 'bignumber.js'
import ZeroClientProvider from 'web3-provider-engine/zero'
import lightwallet from 'eth-lightwallet'
import Web3 from 'web3'
import Transaction from 'ethereumjs-tx'
import {approveTransaction as approveTransactionDialog} from "@/dialogs/index"
import {logTx} from '@/lib/logging'
import {getEstimatedGas, getGasPrice} from "@/lib/remoteGetters"

Vue.use(Vuex)

const APP_TYPES = {
  INTERNAL : 0,
  EXTERNAL : 1,
}

const store = (function () {
  var aeContract
  var derivedKey
  let web3
  let web3ForApps
  let providerOptsForApps
  return new Vuex.Store({
    state: {
      title: '',
      selectedIdentityIdx: 0,
      unlocked: false,
      identityCollapsed: true,
      showIdManager: false,
      token: {
        address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
        decimals: new BigNumber(10).pow(18)
      },
      balances: [],
      rpcUrl: 'https://kovan.infura.io',
      keystore: null,
      forwardPath: '',
      apps : [
        {
          type : APP_TYPES.EXTERNAL,
          name : 'Notary',
          icon : 'static/icons/notary.svg',
          main : 'https://notary.aepps.com'
        },
        {
          type : APP_TYPES.INTERNAL,
          name : 'Transfer',
          icon : 'static/icons/notary.svg',
          main : '/transfer'
        },
        {
          type : APP_TYPES.EXTERNAL,
          name : 'Wall',
          icon : 'static/icons/wall.svg',
          main : 'https://wall.aepps.com'
        },
      ],
    },
    mutations: {
      forwardPath (state, path) {
        state.forwardPath = path
      },
      title (state, newtitle) {
        state.title = newtitle
      },
      appClass (state, newClass) {
        state.appClass = newClass
      },
      identityCollapsed (state, collapse) {
        state.identityCollapsed = collapse
      },
      setAccount (state, account) {
        state.identity.address = account
      },
      setKeystore (state, keystore) {
        state.keystore = keystore
      },
      addApp( state , app) {
        this.state.apps.push(app);
        localStorage.setItem('apps', JSON.stringify(this.state.apps))
      },
      setApps ( state , apps) {
        this.state.apps = apps
      },
      setUnlocked (state, unlocked) {
        state.unlocked = unlocked
      },
      selectIdentity (state, selectedIdentityIdx) {
        state.selectedIdentityIdx = selectedIdentityIdx
      },
      setBalance (state, {address, balance, tokenBalance}) {
        console.log('setBalance', address, balance, tokenBalance)
        if (!address) {
          return
        }
        let balanceObj = state.balances.find(b => b.address === address)
        if (balanceObj) {
          if (balance) {
            balanceObj.balance = balance
          }
          if (tokenBalance) {
            balanceObj.tokenBalance = tokenBalance
          }
        } else {
          state.balances.push({
            address: address,
            balance: balance ? balance : 0,
            tokenBalance: tokenBalance ? tokenBalance : 0
          })
        }
      },
      setShowIdManager (state, showIdManager) {
        state.showIdManager = showIdManager
      }
    },
    getters: {
      web3 () {
        return web3
      },
      addresses: state => {
        if (!state.keystore) {
          return
        }
        return state.keystore.getAddresses().map(function (e) { return e })
      },
      activeIdentity: (state, getters) => {
        if (!state.keystore || !getters.identities.length) {
          return
        }
        if (!state.selectedIdentityIdx === null) {
          return
        }
        return getters.identities[state.selectedIdentityIdx]
      },
      identities: (state, getters) => {
        if (!state.keystore) {
          return []
        }
        return state.keystore.getAddresses().map(e => {
          return {
            address: e,
            name: e.substr(0, 6),
            balance: getters.balanceByAddress(e),
            tokenBalance: getters.tokenBalanceByAddress(e)
          }
        })
      },
      balanceByAddress: (state, getters) => (address) => {
        let balanceObj = state.balances.find(balance => balance.address === address)
        if (balanceObj) {
          return balanceObj.balance
        }
        return 0
      },
      tokenBalanceByAddress: (state, getters) => (address) => {
        let balanceObj = state.balances.find(balance => balance.address === address)
        if (balanceObj) {
          return balanceObj.tokenBalance
        }
        return 0
      }
    },
    actions: {
      addApp({commit}, url) {
        return new Promise((resolve, reject) => {
          const CORS = 'https://cors-anywhere.herokuapp.com/'
          fetch(CORS + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (text) {
              var el = document.createElement('html')
              el.innerHTML = text
              var title = el.getElementsByTagName('title')[0].innerText
              let app = {
                type: APP_TYPES.EXTERNAL,
                name: title,
                icon: 'static/icons/notary.svg',
                main: url
              }
              commit('addApp', app)
              resolve(app)
            })
            .catch(function (reason) {
              let title = prompt('Enter Title')
              if (title) {
                let app = {
                  type: APP_TYPES.EXTERNAL,
                  name: title,
                  icon: 'static/icons/notary.svg',
                  main: url
                }
                commit('addApp', app)
                resolve(app)
              } else {
                reject('no title')
              }
            })
          })
      },
      logout({getters, dispatch, state, commit}) {
        aeContract = null
        derivedKey = null
        web3 = null
        web3ForApps = null
        providerOptsForApps = null
        dispatch('setUnlocked', false)
      },
      mkProviderOptsForApps({getters, state}) {
        providerOptsForApps = {
          getAccounts: function (cb) {
            // Only show them the currently selected account.
            cb(null, [getters.activeIdentity.address])
          },
          signTransaction: function (tx, cb) {
            const t = new Transaction(tx)
            console.log('sign', tx, t)
            var signed = lightwallet.signing.signTx(state.keystore, derivedKey, t.serialize().toString('hex'), tx.from)
            cb(null, '0x' + signed)
          },
          approveTransaction: function (tx, cb) {
            console.log('approve', tx)
            cb(null, true)
          },
          rpcUrl: state.rpcUrl
        }
      },
      mkWeb3ForApps() {
        web3ForApps = new Web3(new ZeroClientProvider(providerOptsForApps))
        window.web3 = web3ForApps
      },
      updateBalances({getters, dispatch, commit, state}) {
        for (let i in getters.address) {
          aeContract.contract.balanceOf(getters.address[i], function (err) {
            if (err) throw err
          })
        }
      },
      generateAddress({dispatch, commit, state}, numAddresses = 1) {
        if (state.keystore === null || !state.unlocked) {
          return
        }
        state.keystore.generateNewAddress(derivedKey, numAddresses)
        let addrList = state.keystore.getAddresses().map(function (e) { return e })
        localStorage.setItem('numUnlockedAddresses', addrList.length)
      },
      changeUser({commit, state}, address) {
        commit('setAccount', address)
        commit('setName', address.substr(0, 6))
      },
      setAcountInterval({dispatch, commit, state, getters}) {
        setInterval(() => {
          if (!web3) {
            return
          }
          if (!getters.identities || getters.identities.length <= 0) {
            console.log('no accounts found')
            return
          }
          getters.identities.forEach(identitiy => {
            let address = identitiy.address
            if (!address) {
              return
            }
            web3.eth.getBalance(address, (err, balance) => {
              if (balance !== null && !balance.equals(getters.balanceByAddress(address))) {
                commit('setBalance', {address: address, balance: balance})
              }
            })

            if (aeContract) {
              aeContract.balanceOf(address, {}, (err, balance) => {
                if (balance !== null && !balance.equals(getters.tokenBalanceByAddress(address))) {
                  commit('setBalance', {address: address, tokenBalance: balance})
                }
              })
            }
          })
        }, 1000)
      },
      setUnlocked({commit}, isUnlocked) {
        commit('setUnlocked', isUnlocked)
      },
      restoreAddresses({getters, dispatch, commit, state}) {
        let numUnlockedAddresses = localStorage.getItem('numUnlockedAddresses')
        if (numUnlockedAddresses > 0) {
          dispatch('generateAddress', numUnlockedAddresses)
        }
      },
      initWeb3({getters, dispatch, commit, state}, pwDerivedKey) {
        if (!state.keystore) {
          return
        }
        derivedKey = pwDerivedKey
        const opts = {
          getAccounts: function (cb) {
            cb(null, getters.addresses)
          },
          signTransaction: function (tx, cb) {
            const t = new Transaction(tx)
            console.log('sign', tx, t)
            var signed = lightwallet.signing.signTx(state.keystore, pwDerivedKey, t.serialize().toString('hex'), tx.from)
            cb(null, '0x' + signed)
          },
          approveTransaction: function (tx, cb) {
            console.log('approve', tx)
            cb(null, true)
          },
          signMessage: function (msg, cb) {
            console.log(msg)
            var signed = lightwallet.signing.signMsg(state.keystore, pwDerivedKey, msg.data, msg.from)
            cb(null, lightwallet.signing.concatSig(signed))
          },
          signPersonalMessage: function (msg, cb) {
            console.log(msg)
            var signed = lightwallet.signing.signMsg(state.keystore, pwDerivedKey, msg.data, msg.from)
            cb(null, lightwallet.signing.concatSig(signed))
          },
          rpcUrl: state.rpcUrl
        }
        // that.providerOpts = opts
        try {
          web3 = new Web3(new ZeroClientProvider(opts))
        } catch (e) {
          console.log(e)
        }
        if (!web3) {
          return
        }
        let TokenContract = web3.eth.contract(aeAbi)
        TokenContract.at(state.token.address, (err, contract) => {
          aeContract = contract
          dispatch('setUnlocked', true)
          window.globalTokenContract = contract
        })
        // dispatch('generateAddress', web3);
        dispatch('setAcountInterval')
        dispatch('mkProviderOptsForApps')
        dispatch('mkWeb3ForApps')
        dispatch('restoreAddresses')
      },
      init({commit, state}) {
        if (localStorage.getItem('ks')) {
          commit('setKeystore', lightwallet.keystore.deserialize(localStorage.getItem('ks')))
        }
        if (localStorage.getItem('apps')) {
          let saved = JSON.parse(localStorage.getItem('apps'))
          let std = state.apps;
          let apps = std.concat(saved)
          apps = apps.filter((app, index, self) => self.findIndex(t => t.name === app.name && t.main === app.main) === index)
          commit('setApps', apps)
        }
      },
      createKeystore({commit, dispatch, state}, {seed, password}) {
        return new Promise(function (resolve, reject) {
          lightwallet.keystore.createVault({
            password: password,
            seedPhrase: seed,
            hdPathString: "m/44'/60'/0'/0"
          }, function (err, keystore) {
            if (err) {
              return reject(err)
            }
            commit('setKeystore', keystore)
            localStorage.setItem('ks', keystore.serialize())
            keystore.keyFromPassword(password, (err, pwDerivedKey) => {
              if (err) {
                return reject(err)
              }
              if (!keystore.isDerivedKeyCorrect(pwDerivedKey)) {
                return reject(new Error('Wrong password'))
              }
              dispatch('initWeb3', pwDerivedKey)
              // generate the first address
              dispatch('generateAddress')
              // since we created a new account, show the id manager
              commit('setShowIdManager', true)
              return resolve()
            })
          })
        })
      },
      signTransaction({state}, tx) {
        const tokenAddress = web3.toHex(state.token.address).toLowerCase()
        logTx(tx, tokenAddress)

        const estimateGas = getEstimatedGas.bind(undefined, web3, tx)
        const _getGasPrice = getGasPrice.bind(undefined, web3)

        return new Promise((resolve, reject) => {
          approveTransactionDialog(tx, estimateGas, _getGasPrice, '').then(approved => {
            if (approved) {
              const t = new Transaction(tx)
              console.log('sign', tx, t)
              const signed = lightwallet.signing.signTx(state.keystore, derivedKey, t.serialize().toString('hex'), tx.from)
              console.log('signed', signed)
              return resolve(signed)
            } else {
              return reject(new Error('Payment rejected by user'))
            }
          })
        })
      }
    }
  })
})()
window.s = store

export default store
