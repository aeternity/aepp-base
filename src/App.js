import IdManager from '@/components/IdManager/IdManager.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'

export default {
  name: 'app',
  components: { IdManager },
  computed: {
    appClassObject: () => {
      return {
        stage: process.env.IS_STAGE === true,
        development: process.env.NODE_ENV === 'development'
      }
    },
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
