import lightwallet from 'eth-lightwallet'
import {PATHS} from '@/router'

import PinInput from '@/components/PinInput.vue'
import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'setup',
  components: {
    PinInput,
    AeButton
  },
  data () {
    return {
      stepIndex: 0,
      seed: '',
      password: '',
      regenerateButtonText: 'generate new',
      copyButtonText: 'COPY TO CLIPBOARD',
      working: false,
      unlockPath: PATHS.UNLOCK
    }
  },
  computed: {
    seedList: function () { return this.seed.match(/\S+/g) },
    // tokenDisplay: function () { return this.tokens.map(function (e) { return e.toString() }) },
    displayPasswordInput () {
      return (this.stepIndex === 1) || this.haveKeyStore
    },
    displayGeneratedSeed () {
      return this.stepIndex === 0
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
    this.generateRandomSeed()
  },
  methods: {
    recoverWidthSeed () {
      if (confirm('This is exprerimental software in development stage. For your own good please don\'t enter a seedphrase of an account you are using on mainnet.\n\nI understand!')) {
        let seed = prompt('Seed phrase')
        if (lightwallet.keystore.isSeedValid(seed)) {
          this.seed = seed
          this.stepIndex++
        } else {
          alert('Invalid seed phrase')
        }
      }
    },
    generateRandomSeed () {
      this.seed = lightwallet.keystore.generateRandomSeed()
    },
    nextStep () {
      if (
        this.haveKeyStore &&
        !window.confirm(
          'Your saved account will be overwritten. Please make sure you have a backup of the seed phrase. Do you want to continue?'
        )
      ) {
        return
      }

      if (confirm('Did you write down that seed phrase?')) {
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
