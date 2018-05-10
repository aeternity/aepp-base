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

  const checkLoggedIn = (to, from, next) => {
    const name = !store.state.keystore && 'intro' ||
      !store.state.derivedKey && 'login'
    if (name) {
      loginTarget = to.fullPath
      next({ name })
      return
    }
    next()
  }

  const router = new Router({
    routes: [
      {
        name: 'intro',
        path: '/',
        component: Intro,
        beforeEnter (to, from, next) {
          if (!from.name && store.state.keystore) return next({ name: 'login' })
          next()
        }
      },
      {
        name: 'onboarding',
        path: '/onboarding',
        component: Onboarding
      },
      {
        name: 'login',
        path: '/login',
        component: Login,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: 'new-account' })
          if (store.state.derivedKey) return next({ name: 'apps' })
          next()
        }
      },
      {
        name: 'recover',
        path: '/recover',
        component: Recover
      },
      {
        name: 'new-account',
        path: '/new-account',
        component: NewAccount
      },
      {
        name: 'set-password',
        path: '/set-password',
        component: SetPassword,
        beforeEnter (to, from, next) {
          if (!store.state.seed) return next({ name: 'intro' })
          next()
        }
      },
      {
        name: 'apps',
        path: '/apps',
        component: Apps,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'transfer',
        path: '/transfer/:to?/:currency?',
        component: Transfer,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'settings',
        path: '/settings',
        component: Settings,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'settings-network',
        path: '/settings/network',
        component: SettingsNetwork,
        beforeEnter: checkLoggedIn
      },
      ...IS_MOBILE_DEVICE ? [{
        name: 'settings-remote-connection',
        path: '/settings/remote-connection',
        component: SettingsRemoteConnection,
        beforeEnter: checkLoggedIn
      }, {
        name: 'settings-remote-connection-new',
        path: '/settings/remote-connection/new',
        component: SettingsRemoteConnectionNew,
        beforeEnter: checkLoggedIn
      }] : [],
      {
        name: 'add-app',
        path: '/add-app',
        component: AddApp,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book',
        path: '/addresses',
        component: AddressBook,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book-new',
        path: '/addresses/new',
        component: AddressBookNew,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book-choose',
        path: '/addresses/choose/:redirectPathTemplate',
        component: AddressBookChoose,
        beforeEnter: checkLoggedIn,
        props: true
      },
      {
        name: 'app-browser',
        path: '/:name/:path*',
        component: AppBrowser,
        beforeEnter: checkLoggedIn
      }
    ]
  })

  store.subscribe(function (mutation, state) {
    switch (mutation.type) {
      case 'setDerivedKey':
        if (state.keystore) {
          if (state.derivedKey) {
            router.push(loginTarget || { name: 'apps' })
            loginTarget = undefined
          } else {
            router.push({ name: 'login' })
          }
        }
        break
      case 'setSeed':
        if (state.seed) router.push({ name: 'set-password' })
        break
    }
  })

  return router
}
