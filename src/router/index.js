import Router from 'vue-router'

import Intro from '@/pages/Intro.vue'
import Onboarding from '@/pages/Onboarding/Onboarding.vue'
import Setup from '@/pages/Setup/Setup.vue'
import Unlock from '@/pages/Unlock/Unlock.vue'
import AppBrowser from '@/pages/AppBrowser/AppBrowser.vue'
import Transfer from '@/pages/Transfer/Transfer.vue'
import Network from '@/pages/Network.vue'

export default (store) => {
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
        name: 'onboarding',
        path: '/onboarding',
        component: Onboarding
      },
      {
        name: 'unlock',
        path: '/unlock',
        component: Unlock,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: 'setup' })
          if (store.state.unlocked) return next({ name: 'app-browser' })
          next()
        }
      },
      {
        name: 'app-browser',
        path: '/app-browser',
        component: AppBrowser,
        beforeEnter (to, from, next) {
          if (!store.state.keystore) return next({ name: 'setup' })
          if (!store.state.unlocked) return next({ name: 'unlock' })
          next()
        }
      },
      {
        name: 'transfer',
        path: '/transfer',
        component: Transfer,
        children: [
          { path: ':txhash', component: Transfer }
        ]
      },
      {
        name: 'network',
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
