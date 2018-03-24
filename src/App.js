import { mapState } from 'vuex'
import { AeBanner } from '@aeternity/aepp-components'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'

export default {
  name: 'app',
  components: { AeBanner },
  data: () => ({
    transitionName: undefined
  }),
  computed: {
    ...mapState({
      notification: state => state.notification
    }),
    appClassObject: () => {
      return {
        stage: process.env.IS_STAGE === true,
        development: process.env.NODE_ENV === 'development'
      }
    }
  },
  watch: {
    $route (to, from) {
      this.transitionName =
        to.name === 'accounts' && 'slide-up' ||
        from.name === 'accounts' && 'slide-down' ||
        undefined
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
