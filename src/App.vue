<template>
  <div id="app">
		<div v-if="needSetup" id="setup">
			<div>
				<span v-for="(it, idx) in seedList" v-bind:class="[idx % 2 ? '' : 'seed-odd', 'seed']">{{ it + ' ' }}</span>
        <input id="seed-in" v-model="seed" width="250" required>
			</div>
			<div>
				is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
			</div>
			<div class="password-input">
        <form @submit.prevent>
          <label>Please enter a password to encrypt your seed while in the browser.</label>
          <div>
            <input v-model="password" type="password" pattern=".{4,}" title="4 characters minimum" required>
            <button v-on:click="savePassword">Save</button>
          </div>
        </form>
			</div>
		</div>
		<div><input v-model="iname"><button v-on:click="loadIFrame">Load</button></div>
		<iframe ref="appframe" id="appframe"></iframe>
		<div class="status">{{ status }}</div>
    <div v-if="addrList.length > 0">
      Make this identity available to the loaded app.
      <button v-on:click="setProvider">Share Identity</button>
    </div>
    <div>
      <button v-on:click="generateAddress">Generate Identity</button>
      <ul>
        <li v-for="(addr, idx) in addrList" v-bind:class="{ 'active-addr': addrIdx === idx}">
          {{ addr }} has {{ tokens[idx] }} AE <button @click="selectAddress(idx)">select</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import lightwallet from 'eth-lightwallet'
import ZeroClientProvider from 'web3-provider-engine/zero'
import Web3 from 'web3'
// import RpcSubprovider from 'web3-provider-engine/subproviders/rpc'

export default {
  name: 'app',
  // components: { Loader },
  computed: {
    seedList: function () { return this.seed.match(/\S+/g) },
    iframe: function () { return this.iname + '.html' }
  },
  created: function () {
    this.seed = lightwallet.keystore.generateRandomSeed()
  },
  methods: {
    selectAddress: function (idx) {
      this.addrIdx = idx
    },
    generateAddress: function () {
      if (this.needSetup || this.keystore === undefined) { return }
      var that = this
      this.keystore.keyFromPassword(that.password, function (err, pwDerivedKey) {
        if (err) throw err
        that.keystore.generateNewAddress(pwDerivedKey, 1)
        that.addrList = that.keystore.getAddresses().map(function (e) { return '0x' + e })
        const off = that.addrList.length - 1
        that.token.contract.balanceOf(that.addrList[off], function (err, bal) {
          if (err) throw err
          that.$set(that.tokens, off, bal.toString())
          // [off] = bal.toString()
        })
      })
    },
    mkProviderOpts: function () {
      var that = this
      this.keystore.keyFromPassword(that.password, function (err, pwDerivedKey) {
        if (err) throw err
        const opts = {
          getAccounts: function (cb) {
            // Only show them the currently selected account.
            console.log('getAccounts', that.addrList, that.addrIdx)
            cb(null, [that.addrList[that.addrIdx]])
          },
          signTransaction: function (tx, cb) {
            var s = lightwallet.txutils.valueTx(tx)
            console.log('sign', tx, s)
            var signed = lightwallet.signing.signTx(that.keystore, pwDerivedKey, s, tx.from)
            cb(null, '0x' + signed)
          },
          approveTransaction: function (tx, cb) {
            console.log('approve', tx)
            cb(null, true)
          },
          rpcUrl: 'https://kovan.infura.io'
        }
        that.providerOpts = opts
      })
    },
    initWeb3: function () {
      var that = this
      const abi = JSON.parse('[{"constant":false,"inputs":[],"name":"launch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addresses","type":"address[]"},{"name":"_values","type":"uint256[]"}],"name":"prefill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transferableUntil","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prefilled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]')
      const opts = {
        getAccounts: function (cb) {
          cb(null, that.addrList)
        },
        signTransaction: function (tx, cb) {
          cb(new Error('cannot sign'), null)
        },
        approveTransaction: function (tx, cb) {
          cb(null, false)
        },
        rpcUrl: 'https://kovan.infura.io'
      }
      this.w3 = new Web3(new ZeroClientProvider(opts))
      this.w3.eth.contract(abi).at(that.token.address, function (err, contract) {
        if (err) throw err
        that.token.contract = contract
      })
    },
    loadIFrame: function () {
      this.$refs.appframe.onload = function () { console.log('loaded iframe', this) }
      console.log(this.$refs.appframe.readyState)
      this.$refs.appframe.src = this.iframe
      window.web3 = new Web3(new ZeroClientProvider(this.providerOpts))
    },
    setProvider: function () {
      // noop for now until we figure out the exact flow.
    },
    savePassword: function () {
      if (this.password.length < 3) {
        return
      }
      var that = this
      lightwallet.keystore.createVault({password: that.password, seedPhrase: that.seed}, function (err, ks) {
        if (err) {
          console.log(err)
          return
        }
        that.keystore = ks
        that.needSetup = false
        that.mkProviderOpts()
        that.initWeb3()
      })
    }
  },
  data () {
    return {
      needSetup: true,
      status: 'Waiting…',
      iname: 'static/aepp',
      keystore: {},
      token: {address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'},
      providerOpts: undefined,
      addrList: [],
      tokens: [],
      addrIdx: 0,
      seed: '',
      password: ''
    }
  }
}
</script>

<style>
#setup {
	width: 100vw;
	height: 100vh;
	background: rgba(255, 255, 255, 0.85);
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
#setup > div {
	width: 70vw;
}
#seed-in {
  width: 100%;
}
#appframe {
  width: 50vw;
  height: 50vh;
}
.seed {
	font-style: italic;
}
.seed-odd {
	font-weight: 700;
}
.password-input {
}
.active-addr {
	font-weight: 700;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
