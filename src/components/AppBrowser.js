import QuickId from '@/components/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      // iframe: '/static/aexistence/index.html'
      iframe: 'http://notary.aepps.dev'
    }
  },
  components: {
    'quick-id': QuickId
  }
}
