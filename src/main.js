// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import aeAbi from './abi/aeternity-token-abi.json'
import BigNumber from 'bignumber.js'
import ZeroClientProvider from 'web3-provider-engine/zero'
import lightwallet from 'eth-lightwallet'

Vue.use(Vuex)

Vue.config.productionTip = false

var aeContract;
var derivedKey;
let web3;

const store = new Vuex.Store({
  state : {
    title : '',
    identity : {
      address : null,
      name : null,
      balance : null,
      tokenBalance : null,
      hasTokens : null,
      aeTokenBalance : null
    },
    selectedIdentityIdx : null,
    unlocked : false,
    //identities : [],
    identityCollapsed: true,
    hasWeb3: false,
    addresses : [],
    token : {
      address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
      decimals: new BigNumber(10).pow(18)
    },
    rpcUrl: 'https://kovan.infura.io',
    keystore : null
  },
  mutations: {
    title(state, newtitle) {
      state.title = newtitle
    },
    appClass(state, newClass) {
      state.appClass = newClass
    },
    identityCollapsed(state, collapse) {
      state.identityCollapsed = collapse
    },
    setAccount(state, account) {
      state.identity.address = account
    },
    setName(state, name) {
      state.identity.name = name
    },
    setBalance(state, balance) {
      state.identity.balance = balance
    },
    setTokenBalance(state, balance) {
      state.identity.tokenBalance = balance
    },
    setHasTokens(state, hasTokens) {
      state.identity.hasTokens = hasTokens
    },
    setKeystore(state, keystore) {
      state.keystore = keystore
    },
    setUnlocked(state, unlocked) {
      state.unlocked = unlocked;
    }
    //setTokenContract : function (state, tokenContract) {
      //console.log(tokenContract);
      //state.tokenContract = tokenContract
    //}
  },
  getters: {
    addresses: state => {
      if(!state.keystore) {
        return
      }
      return state.keystore.getAddresses().map(function (e) { return '0x' + e })
    },
    activeIdentity: (state, getters) => {
      if(!state.keystore || !getters.identities.length) {
        return
      }
      if(!state.selectedIdentityIdx) {
        return
      }
      return getters.identities[state.selectedIdentityIdx]
    },
    identities: state => {
      if(!state.keystore) {
        return
      }
      return state.keystore.getAddresses().map(e => {
        return {
          address : '0x' + e ,
          name : 'null',
          balance : 'null',
          tokenBalance : 'null',
          hasTokens : 'null',
          aeTokenBalance : 'null'
        }
      })
    }
  },
  actions : {
    //selectAddress({ dispatch, commit, state },idx) {
      //dispatch('makePrimary',idx)
      //this.addrIdx = 0
    //},
    //makePrimary({ dispatch, commit, state },idx) {
      //this.swapArray(this.addrList, idx, 0)
      //this.swapArray(this.tokens, idx, 0)
    //},
    //swapArray({ dispatch, commit, state },array, oldIndex, newIndex) {
      //if (newIndex >= array.length) {
        //var k = newIndex - array.length
        //while ((k--) + 1) {
          //this.push(undefined)
        //}
      //}
      //array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
    //},
    //updateBalances({ dispatch, commit, state },) {
      //var that = this
      //for (var i in this.addrList) {
        //that.token.contract.balanceOf(that.addrList[i], function (err, bal) {
          //if (err) throw err
          //that.$set(that.tokens, i, bal.div(that.$store.state.token.decimals))
        //})
      //}
    //},
    generateAddress({ dispatch, commit, state }) {
      if (state.keystore === null) { return }
      state.keystore.generateNewAddress(derivedKey, 1)
      let addrList = state.keystore.getAddresses().map(function (e) { return '0x' + e })
      const off = addrList.length - 1

      console.log('XXX', addrList[off] );

      aeContract.balanceOf(addrList[off], (err, bal) =>{
        if (err) throw err
        console.log(off, bal.div(state.token.decimals).toString())
      })
    },
    changeUser({ commit, state }, address) {
      commit('setAccount', address);
      commit('setName', address.substr(0, 6));
    },
    setAcountInterval({ dispatch, commit, state }, web3) {
      setInterval(() => {
        if (!web3) {
          return
        }
        web3.eth.getAccounts((err, accounts) => {
          if (err) {
            console.log(err);
            return;
          }
          if (accounts.length === 0) {
            console.log('no accounts found');
            return
          }
          let address = accounts[0];
          if (address) {
            let currentAddress = state.identity.address;
            if (address != currentAddress) {
              console.log('address changed');
              dispatch('changeUser', address);
            }

            web3.eth.getBalance(address, (err, balance) => {
              let readable = parseFloat(web3.fromWei(balance.toString(10), 'ether')).toFixed(3);
              if(state.identity.balance !== readable) {
                console.log(err, readable);
                commit('setBalance', readable);
              }
            });

            if (aeContract) {
              //if (state.tokenContract) {
              //state.tokenContract.balanceOf(address, {}, (err, balance) => {
              tokenContract.balanceOf(address, {}, (err, balance) => {
                let readable = web3.fromWei(balance.toString(10), 'ether');
                if(state.identity.tokenBalance !== readable) {
                  commit('setTokenBalance', readable);
                }
                if(state.identity.hasTokens !== balance > 0 ) {
                  commit('setHasTokens', balance > 0);
                }
              });
            }
          }
        })
      }, 1000);
    },
    initWeb3({ dispatch, commit, state }, pwDerivedKey ) {
      if(!state.keystore) {
        return
      }
      derivedKey = pwDerivedKey;
      const opts = {
        getAccounts: function (cb) {
          cb(null, state.addrList)
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
      //that.providerOpts = opts
      web3 = new Web3(new ZeroClientProvider(opts))
      if (!web3) {
        return
      }
      let TokenContract = web3.eth.contract(aeAbi);
      TokenContract.at(state.token.address, (err, contract) => {
        aeContract = contract
        commit('setUnlocked', true);
        window.globalTokenContract = contract
      })
      //dispatch('generateAddress', web3);
      //dispatch('setAcountInterval', web3);
    },
    init({ commit, state }) {
      if (localStorage.getItem('ks')) {
        commit('setKeystore' , lightwallet.keystore.deserialize(localStorage.getItem('ks')))
      }
    }
  }
})
window.s = store;


//router.beforeEach((to, from, next) => {
  //console.log(to.name === 'id-manager' && !store.state.unlocked);
  //if(to.name === 'id-manager' && !store.state.unlocked) {
    //console.log(to.name, from.name);
    //next(false)
    ////console.log(to.name, from );
    ////next({ replace: true, name: 'unlock' })
  //}
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  components: { App },
  store,
  router,
  methods : {
  },
  beforeCreate: function () {
    console.log('before')
  },
  mounted: function() {

    this.$store.dispatch('init');

    console.log('mounted');
    //window.addEventListener('load', () => {
      //this.$store.dispatch( 'initWeb3' )
    //});
    //
    if(this.$store.state.keystore) {
      router.push({ path: 'unlock' })
    }
  }
})
