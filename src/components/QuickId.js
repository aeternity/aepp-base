import { AeIdentity } from '@aeternity/aepp-components'
export default {
  name: 'quick-id',
  components: { AeIdentity },
  data () {
    return {
    }
  },
  computed: {
    identity () {
      return this.$store.getters.activeIdentity
    },
    collapsed () {
      return (!this.showPaymentUi) && this.$store.state.identityCollapsed
    }
  },
  methods: {
    showIdManager () {
      this.$store.dispatch('setShowIdManager', true)
    }
  }
}
