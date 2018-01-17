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
      token: {},
      error: false
    }
  },
  computed: {
    enableButton: function () {
      return this.password === ''
    },
    displayPasswordLoginPage: function () {
      return this.step === 0
    },
    keystore () {
      return this.$store.state.keystore
    }
  },
  methods: {
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
