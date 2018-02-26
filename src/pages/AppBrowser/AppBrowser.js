import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      loading: true,
      path: `//${this.$route.fullPath}`
    }
  },
  components: { QuickId },
  methods: {
    updateUrl ({ data: { method, payload: url } }) {
      if (method !== 'urlChanged') return
      this.$router.replace(url.replace(/^https?:\//i, ''))
    }
  },
  beforeMount () {
    window.addEventListener('message', this.updateUrl, false)
  },
  mounted () {
    this.$refs.appframe.onload = () => {
      this.loading = false
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.updateUrl, false)
  }
}
