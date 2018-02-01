import { AeIdentity } from '@aeternity/aepp-components'

export default {
  name: 'quick-id',
  components: { AeIdentity },
  computed: {
    identity () {
      return this.$store.getters.activeIdentity
    }
  },
  methods: {
    showIdManager () {
      this.$store.dispatch('setShowIdManager', true)
    }
  }
}
