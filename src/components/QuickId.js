import aeIdentity from './aeIdentity/aeIdentity.vue'
import AeppComponents, { AeIdentity } from '@aeternity/aepp-components'
export default {
  name: 'quick-id',
  components: {
    'ae-identity': AeIdentity
  },
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
      this.$store.commit('setShowIdManager', true)
    }
  }
}
