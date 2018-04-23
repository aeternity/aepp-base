import { mapState } from 'vuex'
import { AeMain, AeBanner } from '@aeternity/aepp-components'
import Accounts from '@/pages/Accounts.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'

export default {
  name: 'app',
  components: { AeMain, AeBanner, Accounts },
  computed: {
    ...mapState(['notification', 'showIdManager']),
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
  }
}
