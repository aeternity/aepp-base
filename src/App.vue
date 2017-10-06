<template>
  <div id="app">
		<div v-if="needSetup" id="setup">
			<div v-if="!haveKeyStore">
        <div>
          <span v-for="(it, idx) in seedList" v-bind:class="[idx % 2 ? '' : 'seed-odd', 'seed']">{{ it + ' ' }}</span>
          <input id="seed-in" v-model="seed" width="250" required>
        </div>
        <div>
          is your new wallet seed. Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether.
        </div>
			</div>
      <div v-else>
        Found a saved keystore.
			</div>
			<div class="password-input">
        <form @submit.prevent>
          <label>Please enter your password to encrypt/decrypt your seed.</label>
          <div>
            <input v-model="password" type="password" pattern=".{4,}" title="4 characters minimum" required>
            <button v-on:click="savePassword">Save</button>
            <div ref="pwdinfo" id=""></div>
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
          {{ addr }} has {{ tokenDisplay[idx] }} AE <button @click="selectAddress(idx)">select</button>
          <input v-model="tokenTransferValue" type="number" min="0.000000000000000001" v-if="addrIdx !== idx"><button v-if="addrIdx !== idx" @click="transfer(addr, tokenTransferValue)">send to</button>
        </li>
      </ul>
    </div>
    <div>
      <input v-model="message">
      <button v-on:click="signMsg">sign message</button>
    </div>
    <div>
      <button v-on:click="logout">logout</button>
    </div>
  </div>
</template>

<script>
import lightwallet from 'eth-lightwallet'
import Transaction from 'ethereumjs-tx'
import BigNumber from 'bignumber.js'
import ZeroClientProvider from 'web3-provider-engine/zero'
import Web3 from 'web3'

export default {
  name: 'app',
  computed: {
    seedList: function () { return this.seed.match(/\S+/g) },
    iframe: function () { return this.iname },
    tokenDisplay: function () { return this.tokens.map(function (e) { return e.toString() }) }
  },
  created: function () {
    if (localStorage.getItem('ks')) {
      this.haveKeyStore = true
      this.keystore = lightwallet.keystore.deserialize(localStorage.getItem('ks'))
    } else {
      this.seed = lightwallet.keystore.generateRandomSeed()
    }
  },
  methods: {
    selectAddress: function (idx) {
      this.makePrimary(idx)
      this.addrIdx = 0
    },
    makePrimary: function (idx) {
      this.swapArray(this.addrList, idx, 0)
      this.swapArray(this.tokens, idx, 0)
    },
    swapArray: function (array, oldIndex, newIndex) {
      if (newIndex >= array.length) {
        var k = newIndex - array.length
        while ((k--) + 1) {
          this.push(undefined)
        }
      }
      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
    },
    updateBalances: function () {
      var that = this
      for (var i in this.addrList) {
        that.token.contract.balanceOf(that.addrList[i], function (err, bal) {
          if (err) throw err
          that.$set(that.tokens, i, bal.div(that.token.decimals))
        })
      }
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
          that.$set(that.tokens, off, bal.div(that.token.decimals))
        })
      })
    },
    transferFrom: function (from, to, amount) {
      if (this.token.contract === undefined) return
      var that = this
      const tVal = this.tokenTransferValue
      this.token.contract.transfer(to, this.w3.toBigNumber(tVal).mul(this.token.decimals), {from: from, gas: 100000}, function (err, txid) {
        if (err) {
          console.log('transferFrom', err)
          throw err
        }
        const fIdx = that.addrList.indexOf(from)
        const tIdx = that.addrList.indexOf(to)
        if (fIdx === -1 || tIdx === -1) {
          console.log('could not update token balances locally')
          return
        }
        // TODO: Check back later if this update actually happened on chain.
        that.$set(that.tokens, fIdx, that.tokens[fIdx].sub(tVal))
        that.$set(that.tokens, tIdx, that.tokens[tIdx].add(tVal))
      })
    },
    transfer: function (to, amount) {
      this.transferFrom(this.addrList[this.addrIdx], to, amount)
    },
    signMsg: function () {
      this.w3.personal.sign(this.w3.toHex(this.message), this.addrList[this.addrIdx], function (err, signed) {
        if (err) throw err
        console.log(signed)
      })
    },
    logout: function () {
      this.keystore = {}
      this.needSetup = true
      this.providerOpts = {}
      this.w3 = undefined
      this.password = ''
      localStorage.removeItem('ks')
      this.haveKeyStore = false
    },
    setProvider: function () {},
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
            const t = new Transaction(tx)
            console.log('sign', tx, t)
            var signed = lightwallet.signing.signTx(that.keystore, pwDerivedKey, t.serialize().toString('hex'), tx.from)
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
      this.keystore.keyFromPassword(that.password, function (err, pwDerivedKey) {
        if (err) throw err
        const opts = {
          getAccounts: function (cb) {
            cb(null, that.addrList)
          },
          signTransaction: function (tx, cb) {
            const t = new Transaction(tx)
            console.log('sign', tx, t)
            var signed = lightwallet.signing.signTx(that.keystore, pwDerivedKey, t.serialize().toString('hex'), tx.from)
            cb(null, '0x' + signed)
          },
          approveTransaction: function (tx, cb) {
            console.log('approve', tx)
            cb(null, true)
          },
          signMessage: function (msg, cb) {
            console.log(msg)
            var signed = lightwallet.signing.signMsg(that.keystore, pwDerivedKey, msg.data, msg.from)
            cb(null, lightwallet.signing.concatSig(signed))
          },
          signPersonalMessage: function (msg, cb) {
            console.log(msg)
            var signed = lightwallet.signing.signMsg(that.keystore, pwDerivedKey, msg.data, msg.from)
            cb(null, lightwallet.signing.concatSig(signed))
          },
          rpcUrl: 'https://kovan.infura.io'
        }
        that.providerOpts = opts
        that.w3 = new Web3(new ZeroClientProvider(opts))
        that.w3.eth.contract(abi).at(that.token.address, function (err, contract) {
          if (err) throw err
          that.token.contract = contract
        })
      })
    },
    loadIFrame: function () {
      window.web3 = new Web3(new ZeroClientProvider(this.providerOpts))
      this.$refs.appframe.src = this.iframe
    },
    savePassword: function () {
      if (this.password.length < 3) {
        return
      }
      var that = this

      if (this.haveKeyStore) {
        this.keystore.keyFromPassword(this.password, function (err, pwDerivedKey) {
          if (err) {
            console.log(err)
            return
          }
          if (!that.keystore.isDerivedKeyCorrect(pwDerivedKey)) {
            console.log('wrong password')
            that.$refs.pwdinfo.textContent = 'wrong password'
            return
          }
          that.needSetup = false
          that.mkProviderOpts()
          that.initWeb3()
        })
      } else {
        lightwallet.keystore.createVault({password: that.password, seedPhrase: that.seed}, function (err, ks) {
          if (err) {
            console.log(err)
            return
          }
          that.keystore = ks
          localStorage.setItem('ks', ks.serialize())
          that.needSetup = false
          that.seed = that.seed.replace(/.*/, '\0')
          that.mkProviderOpts()
          that.initWeb3()
        })
      }
    }
  },
  data () {
    return {
      needSetup: true,
      haveKeyStore: false,
      status: 'Waiting…',
      iname: '/static/aexistence/index.html',
      keystore: {},
      message: '',
      token: {address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9', decimals: new BigNumber(10).pow(18)},
      tokenTransferValue: 0.0,
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
