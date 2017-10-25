import QuickId from '@/components/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      iframe: 'static/aexistence/index.html'
    }
  },
  components: {
    'quick-id': QuickId
  },
  mounted: function () {
    if (this.$store.state.keystore == null) {
      this.$router.push({ name: 'setup' })
    } else if (!this.$store.state.unlocked) {
      this.$router.push({ name: 'unlock' })
    }
  }
}
