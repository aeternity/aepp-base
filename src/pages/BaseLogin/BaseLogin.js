import lightwallet from 'eth-lightwallet'
import AeButton from '@/components/aeButton/aeButton.vue'
import PinInput from '@/components/PinInput.vue'

export default {
  name: 'login',
  components: {
    AeButton,
    PinInput
  },
  data () {
    return {
      step: 0,
      password: '',
      seedPin: '',
      passphrase: '',
      token: {},
      error: false
    }
  },
  computed: {
    enablePasswordButton: function () {
      return this.password === ''
    },
    enablePassphraseButton: function () {
      return this.passphrase === ''
    },
    enableSeedPinButton: function () {
      return this.seedPin === ''
    },
    displayPasswordLoginPage: function () {
      return this.step === 0
    },
    displayPassphraseRecoveryPage: function () {
      return this.step === 1
    },
    displayPasswordPinPage: function () {
      return this.step === 2
    },
    keystore () {
      return this.$store.state.keystore
    }
  },
  methods: {
    goToStep (n) {
      this.step = n
    },
    recoverWithSeed () {
      if (this.passphrase.trim().length <= 0) {
        return
      }

      if (lightwallet.keystore.isSeedValid(this.passphrase.trim())) {
        this.step = 2
      } else {
        alert('Invalid seed phrase')
      }
    },
    createAccount: async function () {
      if (this.seedPin.length < 3) {
        return
      }

      this.working = true
      try {
        await this.$store.dispatch('createKeystore', {
          seed: this.passphrase.trim(),
          password: this.seedPin
        })
      } catch (err) {
        // TODO: error handling
        console.log(err)
      }
      this.working = false
    },
    unlockSavedKeystore () {
      if (this.password.length < 4) {
        return
      }

      if (!this.haveKeyStore) {
        // TODO: reroute?
      }

      this.keystore.keyFromPassword(this.password, (err, pwDerivedKey) => {
        if (err) {
          this.error = err.message
          console.log(err)
          return
        }
        if (!this.keystore.isDerivedKeyCorrect(pwDerivedKey)) {
          this.error = 'wrong password'
          console.log(this.error)
          return
        }
        this.error = false
        this.$store.dispatch('initWeb3', pwDerivedKey)
      })
    }
  }
}
