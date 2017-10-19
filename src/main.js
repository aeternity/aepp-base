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

const store = (function(){
  var aeContract;
  var derivedKey;
  let web3;
  let web3ForApps;
  let providerOptsForApps;
  return new Vuex.Store({
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
      selectedIdentityIdx : 0,
      unlocked : false,
      identityCollapsed: true,
      hasWeb3: false,
      addresses : [],
      token : {
        address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
        decimals: new BigNumber(10).pow(18)
      },
      balances : [
      ],
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
      },
      addBalance(state, balance) {
        //TODO: if not already there?
        state.balances.push(balance);
      }
      //setTokenContract : function (state, tokenContract) {
        //console.log(tokenContract);
        //state.tokenContract = tokenContract
      //}
    },
    getters: {
      web3() {
        return web3;
      },
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
          let tokenBalance = null
          if(state.balances) {
            let x = state.balances.find(b => b.address === '0x'+e)
            if(x) {
              tokenBalance = x.tokenBalance;
            }
          }
          return {
            address : '0x' + e ,
            name : 'null',
            balance : 'null',
            tokenBalance : tokenBalance,
            hasTokens : 'null',
            aeTokenBalance : 'null'
          }
        })
      }
    },
    actions : {
      mkProviderOptsForApps({getters, state}) {
        providerOptsForApps = {
          getAccounts: function (cb) {
            // Only show them the currently selected account.
            //console.log('getAccounts', that.addrList, that.addrIdx)
            //
            //TODO: selected index
            cb(null, [getters.addresses[0]])
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
        window.web3 = web3ForApps;
      },
      updateBalances({ getters, dispatch, commit, state },) {
        var that = this
        for (var i in getters.address) {
          aeContract.contract.balanceOf(getters.address[i], function (err, bal) {
            if (err) throw err
            //that.$set(that.tokens, i, bal.div(state.token.decimals))
          })
        }
      },
      generateAddress({ dispatch, commit, state }) {
        if (state.keystore === null) { return }
        state.keystore.generateNewAddress(derivedKey, 1)
        let addrList = state.keystore.getAddresses().map(function (e) { return '0x' + e })
        const off = addrList.length - 1
        aeContract.balanceOf(addrList[off], (err, bal) =>{
          if (err) throw err
          commit('addBalance', {
            address : addrList[off],
            tokenBalance : bal.div(state.token.decimals).toString()
          })
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
            //todo alle abfrage usw...
            let address = accounts[0];
            if (!address) {
              return
            }

            web3.eth.getBalance(address, (err, balance) => {
              let readable = parseFloat(web3.fromWei(balance.toString(10), 'ether')).toFixed(3);
              console.log('eth', readable);
              //if(state.identity.balance !== readable) {
                //console.log(err, readable);
                //commit('setBalance', readable);
              //}
            });

            if (aeContract) {
              aeContract.balanceOf(address, {}, (err, balance) => {
              let readable = web3.fromWei(balance.toString(10), 'ether');
                console.log('ae', readable);
              //if(state.identity.tokenBalance !== readable) {
              //commit('setTokenBalance', readable);
              //}
              })
            }
          })
        }, 1000);
      },
      initWeb3({ getters, dispatch, commit, state }, pwDerivedKey ) {
        if(!state.keystore) {
          return
        }
        derivedKey = pwDerivedKey;
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
        dispatch('mkProviderOptsForApps');
        dispatch('mkWeb3ForApps');
      },
      init({ commit, state }) {
        if (localStorage.getItem('ks')) {
          commit('setKeystore' , lightwallet.keystore.deserialize(localStorage.getItem('ks')))
        }
      }
    }
  })
})();
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
