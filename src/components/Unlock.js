import aeButton from './aeButton/aeButton.vue'
import PinInput from '@/components/PinInput.vue'
import lightwallet from 'eth-lightwallet'
import Web3 from 'web3'
import aeAbi from '../abi/aeternity-token-abi.json'


export default {
  name : 'unlock',
  components : {
    'ae-button' : aeButton,
    'pin-input': PinInput
  },
  data() {
    return {
      password : '',
      token: {},
      error : false
    }
  },
  computed : {
    haveKeyStore() {
      return this.keystore !== null;
    },
    keystore() {
      return this.$store.state.keystore;
    },
    unlocked() {
      return this.$store.state.unlocked;
    }
  },
  watch : {
    unlocked(now_unlocked,before_unlocked) {
      if(!now_unlocked)
        return
      if(this.$store.getters.addresses.length)
        this.$router.push('/browser');
      this.$router.push('/id-manager');
    }
  },
  methods : {
    unlockSavedKeystore() {
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
        this.$store.dispatch( 'initWeb3', pwDerivedKey)
      })
    },
  },
  mounted() {
    if (!this.haveKeyStore) {
      console.log('no keystore');
      this.$router.push({ name: 'intro' })
    } else if (this.$store.state.unlocked) {
      console.log('already unlocked');
      this.$router.push({ name: 'app-browser' })
    }
  }
}
