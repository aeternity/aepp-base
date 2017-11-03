import aeButton from './aeButton/aeButton.vue'
import PinInput from '@/components/PinInput.vue'

export default {
  name: 'unlock',
  components: {
    'ae-button': aeButton,
    'pin-input': PinInput
  },
  data () {
    return {
      password: '',
      token: {},
      error: false
    }
  },
  computed: {
    haveKeyStore () {
      return this.keystore !== null
    },
    keystore () {
      return this.$store.state.keystore
    },
    unlocked () {
      return this.$store.state.unlocked
    }
  },
  watch: {
    unlocked (nowUnlocked) {
      if (!nowUnlocked) return
      if (this.$store.getters.addresses.length) {
        this.$router.push('/app-browser')
      }
      this.$router.push('/app-browser')
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
          this.error = err
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
