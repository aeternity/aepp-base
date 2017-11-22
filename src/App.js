import IdManager from '@/components/IdManager.vue'
import Approve from '@/components/Approve.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'

export default {
  name: 'app',
  components: {
    'id-manager': IdManager,
    'approve' : Approve
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
  mounted: function () {
    let postMessagehandler = new PostMessageHandler(store)
    postMessagehandler.registerListener()
  },
  methods: {
  },
  data () {
    return {}
  }
}
