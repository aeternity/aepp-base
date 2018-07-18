import { mapState } from 'vuex'
import { AeMain, AeBanner, AeButton } from '@aeternity/aepp-components'
import FooterMobile from './components/FooterMobile'
import FooterDesktop from './components/FooterDesktop'
import RemoveAppModal from './components/RemoveAppModal.vue'
import AlertModal from './components/AlertModal'
import IS_MOBILE_DEVICE from './lib/isMobileDevice'

export default {
  name: 'app',
  components: {
    AeMain,
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    AppFooter: IS_MOBILE_DEVICE ? FooterMobile : FooterDesktop
  },
  computed: {
    ...mapState(['notification']),
    displayFooter () {
      const hideQuickIdOn = [
        'onboarding',
        'onboarding-your-accounts',
        'onboarding-aepps',
        'onboarding-active-account',
        'onboarding-secure-account',
        'login',
        'recover',
        'new-account',
        'set-password'
      ]
      if (IS_MOBILE_DEVICE) hideQuickIdOn.push('intro')
      return !hideQuickIdOn.includes(this.$route.name)
    },
    showBackButton () {
      return !['intro', 'apps'].includes(this.$route.name)
    }
  },
  created: function () {
    // set domain to base host because of iframe cross domain policy, very nice hardcoded urls
    if (document.domain.includes('aepps.com')) {
      document.domain = 'aepps.com'
    } else if (document.domain.includes('aepps.dev')) {
      document.domain = 'aepps.dev'
    }
  }
}
