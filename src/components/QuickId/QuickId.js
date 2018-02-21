import { mapGetters } from 'vuex'
import { AeIdentity, AeIcon } from '@aeternity/aepp-components'

export default {
  name: 'quick-id',
  components: { AeIdentity, AeIcon },
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
    },
    disablePropagation (event) {
      event.cancelBubble = true
    }
  }
}
