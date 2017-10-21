import lightwallet from 'eth-lightwallet'
import Transaction from 'ethereumjs-tx'
import ZeroClientProvider from 'web3-provider-engine/zero'
import Web3 from 'web3'

import aeAbi from '../abi/aeternity-token-abi.json'

export default {
  name: 'setup',
  computed: {
    seedList: function () { return this.seed.match(/\S+/g) },
    iframe: function () { return this.iname },
    tokenDisplay: function () { return this.tokens.map(function (e) { return e.toString() }) },
    displayPasswordInput () {
      return (this.stepIndex === 1 && this.needSetup) || this.haveKeyStore
    },
    displayGeneratedSeed () {
      return this.stepIndex === 0 && this.needSetup && !this.haveKeyStore
    }
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
          that.$set(that.tokens, i, bal.div(that.$store.state.token.decimals))
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
          that.$set(that.tokens, off, bal.div(that.$store.state.token.decimals))
        })
      })
    },
    transferFrom: function (from, to, amount) {
      if (this.token.contract === undefined) return
      var that = this
      const tVal = this.tokenTransferValue
      this.token.contract.transfer(to, this.w3.toBigNumber(tVal).mul(this.$store.state.token.decimals), {from: from, gas: 100000}, function (err, txid) {
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
          rpcUrl: that.$store.state.rpcUrl
        }
        that.providerOpts = opts
      })
    },
    nextStep(){
      this.stepIndex++
    },
    initWeb3: function () {
      var that = this
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
          rpcUrl: that.$store.state.rpcUrl
        }
        that.providerOpts = opts
        that.w3 = new Web3(new ZeroClientProvider(opts))
        that.w3.eth.contract(aeAbi).at(that.$store.state.token.address, function (err, contract) {
          if (err) throw err
          that.token.contract = contract
        })
        if (typeof window.web3 === 'undefined') { // Metamask
          window.web3 = that.w3
          that.$store.dispatch('initWeb3')
        }
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
          const passwordAccepted = that.keystore.isDerivedKeyCorrect(pwDerivedKey)
          if (err) {
            console.log(err)
            return
          }
          if (!passwordAccepted) {
            console.log('wrong password')
            that.$refs.pwdinfo.textContent = 'wrong password'
            return
          }
          that.needSetup = false
          that.mkProviderOpts()
          that.initWeb3()
          if (passwordAccepted) {
            this.$router.push('/app-browser')
          }
        })
      } else {
        lightwallet.keystore.createVault({
          password: that.password,
          seedPhrase: that.seed,
          hdPathString: "m/44'/60'/0'/0"
        }, function (err, ks) {
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
          that.$router.push('/app-browser')
        })
      }
    }
  },
  data () {
    return {
      needSetup: true,
      haveKeyStore: false,
      status: 'Waiting…',
      stepIndex: 0,
      iname: '/static/aexistence/index.html',
      keystore: {},
      message: '',
      token: {
      },
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
