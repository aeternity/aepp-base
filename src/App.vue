<template>
  <div id="app">
		<div v-if="needSetup" id="setup">
			<div>
				<span v-for="(it, idx) in seedList" v-bind:class="[idx % 2 ? '' : 'seed-odd', 'seed']">{{ it + ' ' }}</span>
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
		<div><input v-model="iname"></div>
		<iframe v-bind:src="iframe" ref="appframe"></iframe>
		<div class="status">{{ status }}</div>
    <div v-if="addrList.length > 0">
      Make this identity available to the loaded app.
      <button v-on:click="setProvider">Share Identity</button>
    </div>
    <div>
      <button v-on:click="generateAddress">Generate Identity</button>
      <ul>
        <li v-for="(addr, idx) in addrList" v-bind:class="{ 'active-addr': addrIdx === idx}">
          {{ addr }} <button @click="selectAddress(idx)">select</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import lightwallet from 'eth-lightwallet'
import ZeroClientProvider from 'web3-provider-engine/zero'
// import Web3 from 'web3'
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
    setProvider: function () {
      console.log('sharing provider')
      if (this.$refs.appframe.contentWindow.setProvider !== undefined) {
        this.status = 'Found setProvider'
        if (this.providerOpts !== undefined) {
          this.$refs.appframe.contentWindow.setProvider(new ZeroClientProvider(this.providerOpts))
        }
      } else {
        this.status = 'Could not find setProvider'
      }
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
      })
    }
  },
  data () {
    return {
      needSetup: true,
      status: 'Waiting…',
      iname: 'static/sub',
      keystore: {},
      providerOpts: undefined,
      addrList: [],
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
