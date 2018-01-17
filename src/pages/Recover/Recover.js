import lightwallet from 'eth-lightwallet'
import AeButton from '@/components/aeButton/aeButton.vue'

export default {
  components: {
    AeButton
  },
  data () {
    return {
      seed: '',
      passphrase: ''
    }
  },
  computed: {
    enableButton: function () {
      return this.passphrase.trim() === ''
    }
  },
  methods: {
    recoverWidthSeed () {
      if (this.passphrase.trim().length <= 0) {
        return
      }

      if (lightwallet.keystore.isSeedValid(this.passphrase.trim())) {
        console.log('Valid')
        // this.seed = seed
        // this.stepIndex++
      } else {
        alert('Invalid seed phrase')
      }
    }
  }
}
