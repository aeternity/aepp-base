import { mapState } from 'vuex'
import { AeMain, AeBanner, AeButton } from '@aeternity/aepp-components'
import Accounts from './pages/Accounts.vue'
import QuickId from './components/QuickId.vue'
import FooterModal from './components/FooterModal.vue'
import AccountsHorizontal from './components/AccountsHorizontal.vue'
import RemoteConnectionPrompt from './components/RemoteConnectionPrompt.vue'
import WaitingForConfirmation from './components/WaitingForConfirmation.vue'
import RemoveAppModal from './components/RemoveAppModal.vue'
import ApproveMessage from './dialogs/ApproveMessage.vue'
import ApproveTransaction from './dialogs/ApproveTransaction.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'
import IS_MOBILE_DEVICE from './lib/isMobileDevice'

export default {
  name: 'app',
  components: {
    AeMain,
    AeBanner,
    AeButton,
    QuickId,
    FooterModal,
    AccountsHorizontal,
    RemoteConnectionPrompt,
    WaitingForConfirmation,
    RemoveAppModal,
    Accounts,
    ApproveMessage,
    ApproveTransaction
  },
  data: () => ({
    IS_MOBILE_DEVICE
  }),
  computed: {
    ...mapState(['notification', 'showIdManager']),
    ...mapState({
      messageToApprove: ({ mobile }) => mobile.messageToApprove,
      transactionToApprove: ({ mobile }) => Object.values(mobile.transactionsToApprove)[0],
      showRemoteConnectionPrompt: ({ desktop }) => desktop.showRemoteConnectionPrompt,
      transactionIdToSignByRemote: ({ desktop }) => desktop.transactionIdToSignByRemote
    }),
    displayQuickId () {
      const hideQuickIdOn = ['onboarding', 'login', 'recover', 'new-account', 'set-password']
      if (IS_MOBILE_DEVICE) hideQuickIdOn.push('intro')
      return !hideQuickIdOn.includes(this.$route.name)
    },
    showBackButton () {
      return !['intro', 'apps'].includes(this.$route.name)
    }
  },
  methods: {
    toggleDesktopFooter () {
      if (this.transactionIdToSignByRemote) return
      this.$store.commit(`toggle${this.$store.getters.loggedIn
        ? 'IdManager' : 'RemoteConnectionPrompt'}`)
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
