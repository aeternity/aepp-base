import lightwallet from 'eth-lightwallet'
import r, {PATHS} from '../router'

import PinInput from '@/components/PinInput.vue'
import AEButton from '@/components/aeButton/aeButton.vue'

export default {
  name: 'setup',
  components: {
    'pin-input': PinInput,
    'ae-button': AEButton
  },
  data () {
    return {
      stepIndex: 0,
      iname: '/static/aexistence/index.html',
      seed: '',
      password: '',
      regenerateButtonText : 'generate new',
      copyButtonText: 'COPY TO CLIPBOARD',
      working: false
    }
  },
  computed: {
    seedList: function () { return this.seed.match(/\S+/g) },
    iframe: function () { return this.iname },
    // tokenDisplay: function () { return this.tokens.map(function (e) { return e.toString() }) },
    displayPasswordInput () {
      return (this.stepIndex === 1) || this.haveKeyStore
    },
    displayGeneratedSeed () {
      return this.stepIndex === 0 //&& ! this.haveKeyStore
    },
    keystore () {
      return this.$store.state.keystore
    },
    haveKeyStore () {
      return this.keystore !== null
    },
    unlocked () {
      return this.$store.state.unlocked
    }
  },
  created: function () {
    this.generateRandomSeed();
  },
  methods: {
    recoverWidthSeed() {
      let seed = prompt('Seed phrase');
      if(lightwallet.keystore.isSeedValid(seed)) {
        this.seed = seed;
        this.stepIndex++
      } else {
        alert('Invalid seed phrase')
      }
    },
    generateRandomSeed() {
      this.seed = lightwallet.keystore.generateRandomSeed()
    },
    // transferFrom: function (from, to, amount) {
    //   if (this.token.contract === undefined) return
    //   var that = this
    //   const tVal = this.tokenTransferValue
    //   this.token.contract.transfer(to, this.w3.toBigNumber(tVal).mul(this.$store.state.token.decimals), {from: from, gas: 100000}, function (err, txid) {
    //     if (err) {
    //       console.log('transferFrom', err)
    //       throw err
    //     }
    //     const fIdx = that.addrList.indexOf(from)
    //     const tIdx = that.addrList.indexOf(to)
    //     if (fIdx === -1 || tIdx === -1) {
    //       console.log('could not update token balances locally')
    //       return
    //     }
    //     // TODO: Check back later if this update actually happened on chain.
    //     that.$set(that.tokens, fIdx, that.tokens[fIdx].sub(tVal))
    //     that.$set(that.tokens, tIdx, that.tokens[tIdx].add(tVal))
    //   })
    // },
    // transfer: function (to, amount) {
    //   this.transferFrom(this.addrList[this.addrIdx], to, amount)
    // },
    // signMsg: function () {
    //   this.w3.personal.sign(this.w3.toHex(this.message), this.addrList[this.addrIdx], function (err, signed) {
    //     if (err) throw err
    //     console.log(signed)
    //   })
    // },
    goToUnlock () {
      this.$router.push( PATHS.UNLOCK )
    },
    nextStep () {
      if(this.haveKeyStore && !window.confirm("Your saved account will be overwritten. Please make sure you have a backup of the seed phrase. Do you want to continue?")) {
        return
      }

      if(confirm('Did you write down that seed phrase?')) {
        this.stepIndex++
      }
    },
    savePassword: async function () {
      if (this.password.length < 3) {
        return
      }
      this.working = true
      try {
        await this.$store.dispatch('createKeystore', {
          seed: this.seed,
          password: this.password
        })
      } catch (err) {
        // TODO: error handling
        console.log(err)
      }
      this.working = false

      // var that = this
      // if (this.haveKeyStore) {
      //   this.keystore.keyFromPassword(this.password, function (err, pwDerivedKey) {
      //     const passwordAccepted = that.keystore.isDerivedKeyCorrect(pwDerivedKey)
      //     if (err) {
      //       console.log(err)
      //       return
      //     }
      //     if (!passwordAccepted) {
      //       console.log('wrong password')
      //       that.$refs.pwdinfo.textContent = 'wrong password'
      //       return
      //     }
      //     that.needSetup = false
      //     that.mkProviderOpts()
      //     that.initWeb3()
      //     if (passwordAccepted) {
      //       this.$router.push('/app-browser')
      //     }
      //   })
      // } else {
      //   lightwallet.keystore.createVault({
      //     password: that.password,
      //     seedPhrase: that.seed,
      //     hdPathString: "m/44'/60'/0'/0"
      //   }, function (err, ks) {
      //     if (err) {
      //       console.log(err)
      //       return
      //     }
      //     that.keystore = ks
      //     localStorage.setItem('ks', ks.serialize())
      //     that.needSetup = false
      //     that.seed = that.seed.replace(/.*/, '\0')
      //     that.mkProviderOpts()
      //     that.initWeb3()
      //     that.$router.push('/app-browser')
      //   })
      // }
    },
    copySeed: function () {
      try {
        let textArea = this.$refs.seed
        textArea.select()
        document.execCommand('copy')
        this.copyButtonText = 'copied to clipboard'
      } catch (err) {
        console.log('err', err)
      }
    }
  }
}
