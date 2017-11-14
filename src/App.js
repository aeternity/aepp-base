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
  mounted: function () {
    window.addEventListener('message', receiveMessage, false)
    async function receiveMessage (event) {
      let skipSecurity = process.env.NODE_ENV === 'development'
      if (!event.data.uuid) {
        //this message isnt meant for us
        return
      }
      let regex = new RegExp('^https?:\/\/.*\.aepps\.(?:com|dev)$')
      if (!skipSecurity && !regex.test(event.origin)) {
        // not of any of any of our authorized apps
        return
      }
      if (event.data.method === 'getAccounts') {
        let accounts = []
        if (store.getters.activeIdentity.address) {
          accounts.push(store.getters.activeIdentity.address)
        }
        event.source.postMessage({
          uuid: event.data.uuid,
          method: 'getAccountsReturn',
          payload: accounts
        }, '*')
      } else if (event.data.method === 'signTransaction') {
        let tx = event.data.payload
        try {
          let result = await store.dispatch('signTransaction', tx)
          event.source.postMessage({
            uuid: event.data.uuid,
            method: 'signTransactionReturn',
            error : null,
            payload: result
          }, '*')
        } catch (e) {
          /* handle error */
          event.source.postMessage({
            uuid: event.data.uuid,
            method: 'signTransactionReturn',
            error : e,
            payload: null
          }, '*')
        }
      }
    }
  },
  methods: {
  },
  data () {
    return {}
  }
}
