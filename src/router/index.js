import Router from 'vue-router'

import Intro from '@/pages/Intro.vue'
import Setup from '@/pages/Setup/Setup.vue'
import Unlock from '@/pages/Unlock/Unlock.vue'
import Apps from '@/pages/Apps/Apps.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Network from '@/pages/Network.vue'

export default (store) => {
  const checkLoggedIn = (to, from, next) => {
    if (!store.state.keystore) return next({ name: 'setup' })
    if (!store.state.unlocked) return next({ name: 'unlock' })
    next()
  }

  const router = new Router({
    routes: [
      {
        name: 'intro',
        path: '/',
        component: Intro
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
          router.push({
            name: state.unlocked ? 'apps' : 'unlock'
          })
        }
        break
      case 'setKeystore':
        if (state.keystore) return router.push({ name: 'unlock' })
        break
    }
  })

  return router
}
