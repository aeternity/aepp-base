import Router from 'vue-router'
import Intro from '../pages/Intro.vue'
import Onboarding from '../pages/Onboarding.vue'
import OnboardingActiveAccount from '../pages/OnboardingActiveAccount'
import OnboardingAepps from '../pages/OnboardingAepps'
import OnboardingSecureAccount from '../pages/OnboardingSecureAccount'
import OnboardingWelcome from '../pages/OnboardingWelcome'
import OnboardingYourAccounts from '../pages/OnboardingYourAccounts'
import Login from '../pages/Login.vue'
import Recover from '../pages/Recover.vue'
import NewAccount from '../pages/NewAccount.vue'
import NewAccountCreate from '../pages/NewAccountCreate.vue'
import NewAccountConfirm from '../pages/NewAccountConfirm.vue'
import SetPassword from '../pages/SetPassword.vue'
import Apps from '../pages/Apps/Apps.vue'
import AppBrowser from '../pages/AppBrowser/AppBrowser.vue'
import Transfer from '../pages/Transfer/Transfer.vue'
import Settings from '../pages/Settings.vue'
import SettingsNetwork from '../pages/SettingsNetwork.vue'
import SettingsRemoteConnection from '../pages/SettingsRemoteConnection.vue'
import SettingsRemoteConnectionNew from '../pages/SettingsRemoteConnectionNew.vue'
import AddApp from '../pages/AddApp/AddApp.vue'
import AddressBook from '../pages/AddressBook.vue'
import AddressBookNew from '../pages/AddressBookNew.vue'
import AddressBookChoose from '../pages/AddressBookChoose.vue'

export default (store) => {
  let loginTarget

  const checkLoggedIn = requireLoggedIn => (to, from, next) => {
    if (!store.getters.loggedIn) {
      if (process.env.IS_MOBILE_DEVICE) {
        loginTarget = to.fullPath
        next({ name: store.state.mobile.hasMasterKey ? 'login' : 'intro' })
        return
      } else if (requireLoggedIn) {
        loginTarget = to.fullPath
        if (from.name) next(false)
        else next({ name: 'apps' })
        store.commit('toggleRemoteConnectionPrompt')
        return
      }
    }
    next()
  }

  const checkSeedPassed = (to, from, next) => {
    if (!to.params.seed) return next({ name: 'intro' })
    next()
  }

  const router = new Router({
    routes: [
      ...process.env.IS_MOBILE_DEVICE ? [{
        name: 'intro',
        path: '/',
        component: Intro,
        beforeEnter (to, from, next) {
          if (!from.name && store.state.mobile.hasMasterKey) {
            return next({ name: 'login' })
          }
          next()
        }
      }, {
        path: '/onboarding',
        component: Onboarding,
        children: [
          {
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
          }
        ]
      }, {
        name: 'login',
        path: '/login',
        component: Login,
        beforeEnter (to, from, next) {
          if (!store.state.mobile.hasMasterKey) return next({ name: 'new-account' })
          if (store.getters.loggedIn) return next({ name: 'apps' })
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
      }] : [],
      {
        name: 'apps',
        path: process.env.IS_MOBILE_DEVICE ? '/apps' : '/',
        component: Apps,
        beforeEnter: checkLoggedIn(false)
      },
      {
        name: 'transfer',
        path: '/transfer/:to?/:amount?',
        component: Transfer,
        beforeEnter: checkLoggedIn(true)
      },
      {
        name: 'settings',
        path: '/settings',
        component: Settings,
        beforeEnter: checkLoggedIn(false)
      },
      {
        name: 'settings-network',
        path: '/settings/network',
        component: SettingsNetwork,
        beforeEnter: checkLoggedIn(false)
      },
      ...process.env.IS_MOBILE_DEVICE ? [{
        name: 'settings-remote-connection',
        path: '/settings/remote-connection',
        component: SettingsRemoteConnection,
        beforeEnter: checkLoggedIn(true)
      }, {
        name: 'settings-remote-connection-new',
        path: '/settings/remote-connection/new',
        component: SettingsRemoteConnectionNew,
        beforeEnter: checkLoggedIn(true)
      }] : [],
      {
        name: 'add-app',
        path: '/add-app',
        component: AddApp,
        beforeEnter: checkLoggedIn(true)
      },
      {
        name: 'address-book',
        path: '/addresses',
        component: AddressBook,
        beforeEnter: checkLoggedIn(true)
      },
      {
        name: 'address-book-new',
        path: '/addresses/new',
        component: AddressBookNew,
        beforeEnter: checkLoggedIn(true)
      },
      {
        name: 'address-book-choose',
        path: '/addresses/choose/:redirectPathTemplate',
        component: AddressBookChoose,
        beforeEnter: checkLoggedIn(true),
        props: true
      },
      {
        name: 'app-browser',
        path: '/:name/:path*',
        component: AppBrowser,
        beforeEnter: checkLoggedIn(false)
      }
    ]
  })

  store.watch(
    (state, { loggedIn }) => loggedIn,
    loggedIn => {
      if (loggedIn) {
        if (process.env.IS_MOBILE_DEVICE || loginTarget) {
          router.push(loginTarget || { name: 'apps' })
          loginTarget = undefined
        }
      } else {
        loginTarget = router.currentRoute.fullPath
        router.push({ name: process.env.IS_MOBILE_DEVICE ? 'intro' : 'apps' })
      }
    })

  store.subscribe(function (mutation, state) {
    switch (mutation.type) {
      case 'toggleRemoteConnectionPrompt':
        if (!state.desktop.showRemoteConnectionPrompt) loginTarget = undefined
        break
    }
  })

  return router
}
