import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      loading: true
    }
  },
  components: { QuickId },
  computed: {
    path () {
      return `//${this.$route.fullPath}`
    }
  },
  mounted () {
    this.$refs.appframe.onload = () => {
      this.loading = false
    }
  }
}
