import Router from 'vue-router'

import Intro from '@/pages/Intro.vue'
import Setup from '@/pages/Setup/Setup.vue'
import Unlock from '@/pages/Unlock/Unlock.vue'
import Apps from '@/pages/Apps/Apps.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Network from '@/pages/Network.vue'

export default (store) => {
  let loginTarget

  const checkLoggedIn = (to, from, next) => {
    const name = !store.state.keystore && 'intro' ||
      !store.state.unlocked && 'unlock'
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
          if (store.state.keystore) return next({ name: 'unlock' })
          next()
        }
      },
      {
        name: 'setup',
        path: '/setup',
        component: Setup
      },
      {
        name: 'unlock',
        path: '/unlock',
        component: Unlock,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: 'setup' })
          if (store.state.unlocked) return next({ name: 'apps' })
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
        beforeEnter: checkLoggedIn,
        children: [
          { path: ':txhash', component: Transfer }
        ]
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
      case 'setUnlocked':
        if (state.keystore) {
          if (state.unlocked) {
            router.push(loginTarget || { name: 'apps' })
            loginTarget = undefined
          } else {
            router.push({ name: 'unlock' })
          }
        }
        break
    }
  })

  return router
}
