import aeIdentity from './aeIdentity/aeIdentity.vue'
import aeButton from './aeButton/aeButton.vue'
export default {
  name : 'IdManager',
  components : {
    'ae-identity' : aeIdentity,
    'ae-button' : aeButton
  },
  computed : {
    addresses() {
      return this.$store.getters.addresses
    },
    identities() {
      return this.$store.getters.identities
    }
  },
  methods : {
    generateFirstAddress() {
      console.log( 'generateFirstAddress' )
      this.$store.dispatch('generateAddress')
    },
    generateNewIdentity() {
      console.log( 'generateNewIdentity' )
      this.$store.dispatch('generateAddress')
    }
  },
  created() {
    if(!this.$store.state.unlocked) {
      this.$router.push({ path: 'unlock' })
    }
    if(this.addresses && this.addresses.length < 1) {
      this.generateFirstAddress()
    }
  }
}
