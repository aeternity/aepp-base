import Router from 'vue-router'
import IS_MOBILE_DEVICE from '@/lib/isMobileDevice'

import Intro from '@/pages/Intro.vue'
import Onboarding from '@/pages/Onboarding/Onboarding.vue'
import Login from '@/pages/Login.vue'
import Recover from '@/pages/Recover.vue'
import NewAccount from '@/pages/NewAccount.vue'
import SetPassword from '@/pages/SetPassword.vue'
import Apps from '@/pages/Apps/Apps.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Settings from '@/pages/Settings.vue'
import SettingsNetwork from '@/pages/SettingsNetwork.vue'
import SettingsRemoteConnection from '@/pages/SettingsRemoteConnection.vue'
import SettingsRemoteConnectionNew from '@/pages/SettingsRemoteConnectionNew.vue'
import AddApp from '@/pages/AddApp/AddApp.vue'
import AddressBook from '@/pages/AddressBook.vue'
import AddressBookNew from '@/pages/AddressBookNew.vue'
import AddressBookChoose from '@/pages/AddressBookChoose.vue'

export default (store) => {
  let loginTarget

  const checkLoggedIn = requireLoggedIn => (to, from, next) => {
    if (!store.getters.loggedIn) {
      if (IS_MOBILE_DEVICE) {
        loginTarget = to.fullPath
        next({ name: store.state.mobile.keystore ? 'login' : 'intro' })
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

  const router = new Router({
    routes: [
      ...IS_MOBILE_DEVICE ? [{
        name: 'intro',
        path: '/',
        component: Intro,
        beforeEnter (to, from, next) {
          if (!from.name && store.state.mobile.keystore) {
            return next({ name: 'login' })
          }
          next()
        }
      }, {
        name: 'onboarding',
        path: '/onboarding',
        component: Onboarding
      }, {
        name: 'login',
        path: '/login',
        component: Login,
        beforeEnter (to, from, next) {
          if (!store.state.mobile.keystore) return next({ name: 'new-account' })
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
        name: 'set-password',
        path: '/set-password',
        component: SetPassword,
        beforeEnter (to, from, next) {
          if (!store.state.mobile.seed) return next({ name: 'intro' })
          next()
        }
      }] : [],
      {
        name: 'apps',
        path: IS_MOBILE_DEVICE ? '/apps' : '/',
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
      ...IS_MOBILE_DEVICE ? [{
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
        if (IS_MOBILE_DEVICE || loginTarget) {
          router.push(loginTarget || { name: 'apps' })
          loginTarget = undefined
        }
      } else {
        loginTarget = router.currentRoute.fullPath
        router.push({ name: IS_MOBILE_DEVICE ? 'intro' : 'apps' })
      }
    })

  store.subscribe(function (mutation, state) {
    switch (mutation.type) {
      case 'setSeed':
        if (state.mobile.seed) router.push({ name: 'set-password' })
        break
      case 'toggleRemoteConnectionPrompt':
        if (!state.desktop.showRemoteConnectionPrompt) loginTarget = undefined
        break
    }
  })

  return router
}
