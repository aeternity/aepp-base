import { AeButton } from '@aeternity/aepp-components'
import PinInput from '@/components/PinInput/PinInput.vue'
import { PATHS } from '@/router/'

export default {
  name: 'unlock',
  components: {
    AeButton,
    PinInput
  },
  data () {
    return {
      password: '',
      token: {},
      error: false,
      unlockDifferentPath: PATHS.SETUP
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
  mounted () {
    if (this.$refs.pinInput) {
      this.$refs.pinInput.focus()
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
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === PATHS.SETUP) {
      const leaveConfirmed = window.confirm(
        'Your saved account will be overwritten. Please make sure you have a backup of the seed phrase. Do you want to continue?'
      )

      if (leaveConfirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
