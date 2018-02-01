import { mapGetters } from 'vuex'
import { AeIdentity } from '@aeternity/aepp-components'

export default {
  name: 'quick-id',
  components: { AeIdentity },
  computed: mapGetters({
    identity: 'activeIdentity'
  }),
  methods: {
    showIdManager () {
      this.$store.dispatch('setShowIdManager', true)
    }
  }
}
