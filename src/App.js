import { mapState } from 'vuex'
import { AeMain, AeBanner, AeButton } from '@aeternity/aepp-components'
import FooterMobile from './components/FooterMobile'
import FooterDesktop from './components/FooterDesktop'
import RemoveAppModal from './components/RemoveAppModal.vue'
import AlertModal from './components/AlertModal'

export default {
  name: 'app',
  components: {
    AeMain,
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    AppFooter: process.env.IS_MOBILE_DEVICE ? FooterMobile : FooterDesktop
  },
  computed: mapState(['notification']),
  created: function () {
    // set domain to base host because of iframe cross domain policy, very nice hardcoded urls
    if (document.domain.includes('aepps.com')) {
      document.domain = 'aepps.com'
    } else if (document.domain.includes('aepps.dev')) {
      document.domain = 'aepps.dev'
    }
  }
}
