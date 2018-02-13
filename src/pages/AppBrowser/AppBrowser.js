import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      loading: true,
      initialUrl: ''
    }
  },
  components: { QuickId },
  computed: {
    currentAppUrl () {
      return this.$store.state.currentAppUrl
    }
  },
  mounted () {
    this.initialUrl = `//${this.$route.fullPath}`
    this.$refs.appframe.onload = () => {
      this.loading = false
    }
  },
  watch: {
    currentAppUrl (newUrl) {
      newUrl = newUrl.replace(/^https?:\/\//i, '')
      // use replace because the iframe has its own back stack
      this.$router.replace('/' + newUrl)
    }
  }
}
