import aeButton from './aeButton/aeButton.vue'
import PinInput from '@/components/PinInput.vue'
import router, { PATHS } from '../router/'
console.log(PATHS)

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
  mounted() {
    if(this.$refs.pinInput) {
      console.log(this.$refs.pinInput);
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
    },
    unlockDifferentKeystore () {
      if (window.confirm("Your saved account will be overwritten. Please make sure you have a backup of the seed phrase. Do you want to continue?")) {
        //window.open("exit.html", "Thanks for Visiting!");
        this.$router.push(PATHS.SETUP)

      }
    }
  }
}
