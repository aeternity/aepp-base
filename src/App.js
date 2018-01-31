import { mapState } from 'vuex'
import { AeNotification } from '@aeternity/aepp-components'
import IdManager from '@/components/IdManager/IdManager.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'

export default {
  name: 'app',
  components: { AeNotification, IdManager },
  computed: {
    ...mapState({
      showIdManager: state => state.showIdManager && state.unlocked,
      idManagerClassObject: state => ({
        'app_id-manager': true,
        '_open': state.showIdManager && state.unlocked
      }),
      notification: state => state.notification
    }),
    appClassObject: () => {
      return {
        stage: process.env.IS_STAGE === true,
        development: process.env.NODE_ENV === 'development'
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
    closeNotification () {
      this.$store.commit('setNotification')
    }
  },
  data () {
    return {}
  }
}
