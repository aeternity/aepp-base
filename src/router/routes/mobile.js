import { checkLoggedIn } from '../utils'
import store from '../../store/index'
import Intro from '../../pages/Intro.vue'
import Onboarding from '../../pages/Onboarding.vue'
import OnboardingActiveAccount from '../../pages/OnboardingActiveAccount'
import OnboardingAepps from '../../pages/OnboardingAepps'
import OnboardingSecureAccount from '../../pages/OnboardingSecureAccount'
import OnboardingWelcome from '../../pages/OnboardingWelcome'
import OnboardingYourAccounts from '../../pages/OnboardingYourAccounts'
import Login from '../../pages/Login.vue'
import Recover from '../../pages/Recover.vue'
import NewAccount from '../../pages/NewAccount.vue'
import NewAccountCreate from '../../pages/NewAccountCreate.vue'
import NewAccountConfirm from '../../pages/NewAccountConfirm.vue'
import SetPassword from '../../pages/SetPassword.vue'
import SettingsRemoteConnection from '../../pages/SettingsRemoteConnection.vue'

const SettingsRemoteConnectionNew = () =>
  import('../../pages/SettingsRemoteConnectionNew.vue')

const checkSeedPassed = (to, from, next) => {
  if (!to.params.seed) return next({ name: 'intro' })
  next()
}

export default [{
  name: 'intro',
  path: '/',
  component: Intro,
  beforeEnter (to, from, next) {
    if (!from.name && (store.state.mobile.keystore || store.state.mobile.hasMasterKey)) {
      return next({ name: 'login' })
    }
    next()
  }
}, {
  path: '/onboarding',
  component: Onboarding,
  children: [{
    name: 'onboarding',
    path: '',
    component: OnboardingWelcome
  }, {
    name: 'onboarding-your-accounts',
    path: 'your-accounts',
    component: OnboardingYourAccounts
  }, {
    name: 'onboarding-aepps',
    path: 'aepps',
    component: OnboardingAepps
  }, {
    name: 'onboarding-active-account',
    path: 'active-account',
    component: OnboardingActiveAccount
  }, {
    name: 'onboarding-secure-account',
    path: 'secure-account',
    component: OnboardingSecureAccount
  }]
}, {
  name: 'login',
  path: '/login',
  component: Login,
  beforeEnter (to, from, next) {
    if (!store.state.mobile.keystore && !store.state.mobile.hasMasterKey) {
      return next({ name: 'new-account' })
    }

    if (store.getters.loggedIn) return next({ name: 'apps' })

    if (store.state.mobile.hasMasterKey) {
      return store.dispatch('unlockMasterKey').catch(() => next())
    }

    next()
  }
}, {
  name: 'recover',
  path: '/recover',
  component: Recover
}, {
  name: 'new-account',
  path: '/new-account',
  component: NewAccount
}, {
  name: 'new-account-create',
  path: '/new-account/create',
  component: NewAccountCreate
}, {
  name: 'new-account-confirm',
  path: '/new-account/confirm',
  component: NewAccountConfirm,
  beforeEnter: checkSeedPassed,
  props: true
}, {
  name: 'set-password',
  path: '/set-password',
  component: SetPassword,
  beforeEnter: checkSeedPassed,
  props: true
}, {
  name: 'settings-remote-connection',
  path: '/settings/remote-connection',
  component: SettingsRemoteConnection,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true
  }
}, {
  name: 'settings-remote-connection-new',
  path: '/settings/remote-connection/new',
  component: SettingsRemoteConnectionNew,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true
  }
}]
