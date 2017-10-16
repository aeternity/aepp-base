// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import aeAbi from './abi/aeternity-token-abi.json'
import BigNumber from 'bignumber.js'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state : {
    title : '',
    identity : {
      address : null,
      name : null,
      balance : null,
      tokenBalance : null,
      hasTokens : null
    },
    identityCollapsed: true,
    hasWeb3: false,
    //tokenAddress: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
    token : {
      address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
      decimals: new BigNumber(10).pow(18)
    },
    rpcUrl: 'https://kovan.infura.io'
  },
  mutations: {
    title: function (state, newtitle) {
      state.title = newtitle
    },
    appClass: function (state, newClass) {
      state.appClass = newClass
    },
    identityCollapsed: function (state, collapse) {
      state.identityCollapsed = collapse
    },
    setAccount: function (state, account) {
      state.identity.address = account
    },
    setName: function (state, name) {
      state.identity.name = name
    },
    setBalance: function (state, balance) {
      state.identity.balance = balance
    },
    setTokenBalance: function (state, balance) {
      state.identity.tokenBalance = balance
    },
    setHasTokens: function (state, hasTokens) {
      state.identity.hasTokens = hasTokens
    },
    //setTokenContract : function (state, tokenContract) {
      //console.log(tokenContract);
      //state.tokenContract = tokenContract
    //}
  },
  actions : {
    changeUser({ commit, state }, address) {
      commit('setAccount', address);
      commit('setName', address.substr(0, 6));
    },
    setAcountInterval({ dispatch, commit, state }, web3) {
      setInterval(() => {
        if (web3) {
          web3.eth.getAccounts((err, accounts) => {
            if (err) {
              console.log(err);
              return;
            } else if (accounts.length === 0) {
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

              let tokenContract = window.globalTokenContract;
              if (tokenContract) {
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
        }
      }, 1000);
    },
    initWeb3({ dispatch, state } ) {
      let web3;
      if (typeof window.web3 !== 'undefined') { // Metamask
        web3 = new Web3(window.web3.currentProvider);
      } else if (window.parent !== window && window.parent.web3 !== undefined) {
        // Parent has something for us.
        console.log('loaded with parent web3 instance');
        web3 = new Web3(window.parent.web3.currentProvider);
      } else {
        web3 = null;
      }
      if (web3) {
        dispatch('initTokenContract', web3);
        dispatch('setAcountInterval', web3);
      }
    },
    initTokenContract({ commit, state }, web3) {
      let TokenContract = web3.eth.contract(aeAbi);
      TokenContract.at(state.token.address, (err, contract) => {
        window.globalTokenContract = contract
        //commit('setTokenContract', contract);
      });
    }
  }
})

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
    console.log('mounted');
    window.addEventListener('load', () => {
      this.$store.dispatch( 'initWeb3' )
    });
  }
})
