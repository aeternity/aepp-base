import { mapState } from 'vuex'
import { AeMain, AeBanner } from '@aeternity/aepp-components'
import Accounts from '@/pages/Accounts.vue'
import QuickId from '@/components/QuickId.vue'
import FooterModal from '@/components/FooterModal.vue'
import AccountsHorizontal from '@/components/AccountsHorizontal.vue'
import ApproveMessage from '@/dialogs/ApproveMessage.vue'
import ApproveTransaction from '@/dialogs/ApproveTransaction.vue'
import store from './store'
import PostMessageHandler from './lib/postMessageHandler'
import IS_MOBILE_DEVICE from './lib/isMobileDevice'

export default {
  name: 'app',
  components: {
    AeMain,
    AeBanner,
    QuickId,
    FooterModal,
    AccountsHorizontal,
    Accounts,
    ApproveMessage,
    ApproveTransaction
  },
  data: () => ({
    IS_MOBILE_DEVICE
  }),
  computed: {
    ...mapState(['notification', 'showIdManager', 'messageToApprove', 'transactionToApprove']),
    appClassObject: () => {
      return {
        stage: process.env.IS_STAGE === true,
        development: process.env.NODE_ENV === 'development'
      }
    },
    displayQuickId () {
      return !['intro', 'onboarding', 'login', 'recover', 'new-account', 'set-password']
        .includes(this.$route.name)
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
