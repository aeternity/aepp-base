import { mapGetters } from 'vuex'
import { AeIdentity } from '@aeternity/aepp-components'

export default {
  name: 'quick-id',
  components: { AeIdentity },
  computed: mapGetters({
    identity: 'activeIdentity'
  }),
  props: {
    showBackButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showIdManager () {
      this.$store.dispatch('updateAllBalances')
      this.$store.commit('toggleIdManager')
    }
  }
}
