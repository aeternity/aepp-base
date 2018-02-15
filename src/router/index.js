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

export default (store) => {
  let loginTarget

  const checkLoggedIn = (to, from, next) => {
    const name = !store.state.keystore && 'intro' ||
      !store.state.derivedKey && 'login'
    if (name) {
      loginTarget = to.fullPath
      next({ name })
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
        path: '/transfer',
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
