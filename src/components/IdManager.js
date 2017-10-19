import aeIdentity from './aeIdentity/aeIdentity.vue'
export default {
  name : 'IdManager',
  components : {
    'ae-identity' : aeIdentity
  },
  computed : {
    addresses() {
      return this.$store.getters.addresses
    }
  },
  methods : {
    generateFirstAddress() {
      this.$store.dispatch('generateAddress')
    }
  },
  created() {
    if(!this.$store.state.unlocked) {
      this.$router.push({ path: 'unlock' })
    }
    if(this.addresses.length < 1) {
      this.generateFirstAddress()
    }
  }
}
