import Router from 'vue-router'

import Intro from '@/pages/Intro.vue'
import Onboarding from '@/pages/Onboarding/Onboarding.vue'
import Login from '@/pages/Login.vue'
import Recover from '@/pages/Recover.vue'
import NewAccount from '@/pages/NewAccount.vue'
import SetPassword from '@/pages/SetPassword.vue'
import Apps from '@/pages/Apps/Apps.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Network from '@/pages/Network.vue'
import AddApp from '@/pages/AddApp/AddApp.vue'
import AddressBook from '@/pages/AddressBook.vue'
import AddressBookNew from '@/pages/AddressBookNew.vue'
import AddressBookChoose from '@/pages/AddressBookChoose.vue'
import Pairing from '@/pages/Pairing.vue'

export default (store) => {
  let loginTarget

  const checkLoggedIn = (to, from, next) => {
    const name = !store.state.pairConnected &&
      (!store.state.keystore && 'intro' || !store.state.derivedKey && 'login')
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
        name: 'network',
        path: '/network',
        component: Network,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'add-app',
        path: '/add-app',
        component: AddApp,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book',
        path: '/address-book',
        component: AddressBook,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book-new',
        path: '/address-book/new',
        component: AddressBookNew,
        beforeEnter: checkLoggedIn
      },
      {
        name: 'address-book-choose',
        path: '/address-book/choose/:redirectPathTemplate',
        component: AddressBookChoose,
        beforeEnter: checkLoggedIn,
        props: true
      },
      {
        name: 'pairing',
        path: '/pairing',
        component: Pairing,
        beforeEnter: (to, from, next) => {
          next(store.state.keystore && !store.state.derivedKey ? { name: 'login' } : undefined)
        }
      },
      {
        name: 'app-browser',
        path: '/:name/:path*',
        component: AppBrowser,
        beforeEnter: checkLoggedIn
      }
    ]
  })

  store.watch(
    (state, { loggedIn }) => loggedIn,
    loggedIn => {
      if (loggedIn) {
        router.push(loginTarget || { name: 'apps' })
        loginTarget = undefined
      } else {
        try {
          router.currentRoute.matched[0].beforeEnter(
            router.currentRoute,
            router.currentRoute,
            route => route && router.push(route))
        } catch (e) {}
      }
    })

  store.subscribe(function (mutation, state) {
    switch (mutation.type) {
      case 'setSeed':
        if (state.seed) router.push({ name: 'set-password' })
        break
    }
  })

  return router
}
