import IdManager from '@/components/IdManager.vue'
import store from './store'

export default {
  name: 'app',
  components: {
    'id-manager': IdManager
  },
  computed: {
    showIdManager: () => {
      return store.state.showIdManager && store.state.unlocked
    },
    idManagerClassObject () {
      return {
        'app_id-manager': true,
        '_open': store.state.showIdManager && store.state.unlocked
      }
    }
  },
  created: function () {
    // set domain to base host because of iframe cross domain policy, very nice hardcoded urls
    if (document.domain.includes('aepps.com')) {
      document.domain = 'aepps.com'
    } else if (document.domain.includes('aepps.dev')) {
      document.domain = 'aepps.dev'
    }
  },
  methods: {
  },
  data () {
    return {}
  }
}
