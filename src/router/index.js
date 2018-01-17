import Vue from 'vue'
import Router from 'vue-router'

import Intro from '../pages/Intro/Intro.vue'
import OnBoard from '../pages/OnBoard/OnBoard.vue'
import BaseLogin from '../pages/BaseLogin/BaseLogin.vue'
import Setup from '@/components/Setup.vue'
import Unlock from '@/components/Unlock.vue'
import AppBrowser from '@/components/AppBrowser.vue'
import Transfer from '@/components/Transfer.vue'
import Network from '@/components/Network.vue'

Vue.use(Router)

export const PATHS = {
  ROOT: '/',
  ON_BOARD: '/on-board',
  LOGIN: '/login',
  SETUP: '/setup',
  UNLOCK: '/unlock',
  EMBEDDED_APP: '/app-browser',
  TRANSFER: '/transfer',
  NETWORK: '/network'
}

const router = new Router({
  routes: [
    {
      name: 'intro',
      path: PATHS.ROOT,
      component: Intro,
      meta: {
        title: 'Welcome',
        appClass: 'welcome'
      }
    },
    {
      name: 'onBoard',
      path: PATHS.ON_BOARD,
      component: OnBoard,
      meta: {
        title: 'OnBoard',
        appClass: 'onBoard'
      }
    },
    {
      name: 'login',
      path: PATHS.LOGIN,
      component: BaseLogin,
      meta: {
        title: 'Login',
        appClass: 'login'
      }
    },
    {
      name: 'setup',
      path: PATHS.SETUP,
      component: Setup,
      meta: {
        title: 'Setup',
        appClass: 'setup'
      }
    },
    {
      name: 'unlock',
      path: PATHS.UNLOCK,
      component: Unlock,
      meta: {
        title: 'Unlock',
        appClass: 'unlock'
      }
    },
    {
      name: 'app-browser',
      path: PATHS.EMBEDDED_APP,
      component: AppBrowser,
      meta: {
        title: 'App Browser',
        appClass: 'app-browser'
      }
    },
    {
      name: 'transfer',
      path: PATHS.TRANSFER,
      component: Transfer,
      meta: {
        title: 'Transfer',
        appClass: 'transfer'
      },
      children: [{ path: ':txhash', component: Transfer }]
    },
    {
      name: 'network',
      path: PATHS.NETWORK,
      component: Network,
      meta: {
        title: 'Network',
        appClass: 'network'
      }
    }
  ]
})

export default router

const _actionHandlers = {}

const _mutationHandlers = {
  setUnlocked: function (router, state) {
    if (state.keystore) {
      if (state.unlocked) {
        router.push(PATHS.EMBEDDED_APP)
      } else {
        router.push(PATHS.UNLOCK)
      }
    }
  },
  setKeystore: function (router, state, currentPath) {
    if (state.keystore) {
      router.push(PATHS.UNLOCK)
    } else {
      const denyAccess = currentPath === PATHS.EMBEDDED_APP
      if (denyAccess) {
        router.push(PATHS.SETUP)
      }
    }
  }
}

const _pathResolvers = {}

_pathResolvers[PATHS.EMBEDDED_APP] = function (state) {
  if (!state.keystore) {
    return PATHS.SETUP
  } else if (!state.unlocked) {
    return PATHS.UNLOCK
  }
}

_pathResolvers[PATHS.UNLOCK] = function (state) {
  if (!state.keystore) {
    return PATHS.SETUP
  } else if (state.unlocked) {
    return PATHS.EMBEDDED_APP
  }
}

_pathResolvers[PATHS.SETUP] = function (state) {
  // if (state.keystore) {
  // if (state.unlocked) {
  // return PATHS.EMBEDDED_APP
  // } else {
  // return PATHS.UNLOCK
  // }
  // }
}

export const manageRouting = function (store, router) {
  router.onReady(function () {
    const currentPath = router.currentRoute.path
    const resolver = _pathResolvers[currentPath]
    if (typeof resolver === 'function') {
      const result = resolver(store.state, currentPath)
      if (typeof result === 'string') {
        router.push(result)
      }
    }
  })

  store.subscribe(function (mutation, state) {
    const handler = _mutationHandlers[mutation.type]
    if (typeof handler === 'function') {
      handler(router, state, router.currentPath)
    }
  })

  store.subscribeAction(function (action, state) {
    const handler = _actionHandlers[action.type]
    if (typeof handler === 'function') {
      handler(router, state)
    }
  })

  router.beforeEach(function (to, from, next) {
    if (from.path !== to.path) {
      const resolver = _pathResolvers[to.path]
      if (typeof resolver === 'function') {
        const result = resolver(store.state, from)
        if (typeof result === 'string') {
          next({ path: result, replace: true })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  })
}
