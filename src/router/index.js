import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/pages/Intro.vue'
import Setup from '@/pages/Setup/Setup.vue'
import Unlock from '@/pages/Unlock/Unlock.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Network from '@/pages/Network.vue'

Vue.use(Router)

export const NAMES = {
  INTRO: 'intro',
  SETUP: 'setup',
  UNLOCK: 'unlock',
  APP_BROWSER: 'app-browser',
  TRANSFER: 'transfer',
  NETWORK: 'network'
}

export default (store) => {
  const router = new Router({
    routes: [
      {
        name: NAMES.INTRO,
        path: '/',
        component: Intro
      },
      {
        name: NAMES.SETUP,
        path: '/setup',
        component: Setup
      },
      {
        name: NAMES.UNLOCK,
        path: '/unlock',
        component: Unlock,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: NAMES.SETUP })
          if (store.state.unlocked) return next({ name: NAMES.APP_BROWSER })
          next()
        }
      },
      {
        name: NAMES.APP_BROWSER,
        path: '/app-browser',
        component: AppBrowser,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: NAMES.SETUP })
          if (!store.state.unlocked) return next({ name: NAMES.UNLOCK })
          next()
        }
      },
      {
        name: NAMES.TRANSFER,
        path: '/transfer',
        component: Transfer,
        children: [
          { path: ':txhash', component: Transfer }
        ]
      },
      {
        name: NAMES.NETWORK,
        path: '/network',
        component: Network
      }
    ]
  })

  store.subscribe(function (mutation, state) {
    switch (mutation.type) {
      case 'setUnlocked':
        if (state.keystore) {
          router.push({
            name: state.unlocked ? 'app-browser' : 'unlock'
          })
        }
        break
      case 'setKeystore':
        if (state.keystore) return router.push({ name: 'unlock' })
        if (router.route.name === 'app-browser') return router.push({ name: 'setup' })
        break
    }
  })

  return router
}
